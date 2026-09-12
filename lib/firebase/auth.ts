import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./config";
import { AdminUser } from "@/types/admin";

/**
 * ============================
 * TYPES
 * ============================
 */

export interface AuthResult {
  user: AdminUser | null;
  error: string | null;
}

export interface LoginUserResult {
  user: User | null;
  role: "admin" | "customer" | null;
  error: string | null;
}

/**
 * ============================
 * FIREBASE ERROR MESSAGES
 * ============================
 */

function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Authentication failed. Please try again.";
  }

  switch (error.message) {
    case "Firebase: Error (auth/invalid-credential).":
      return "Invalid email or password.";

    case "Firebase: Error (auth/user-not-found).":
      return "No account found with this email.";

    case "Firebase: Error (auth/wrong-password).":
      return "Incorrect password.";

    case "Firebase: Error (auth/too-many-requests).":
      return "Too many login attempts. Please try again later.";

    case "Firebase: Error (auth/email-already-in-use).":
      return "An account already exists with this email.";

    case "Firebase: Error (auth/weak-password).":
      return "Password is too weak. Please use a stronger password.";

    case "Firebase: Error (auth/invalid-email).":
      return "Please enter a valid email address.";

    default:
      return error.message || "Authentication failed.";
  }
}

/**
 * ============================
 * SINGLE LOGIN
 * ============================
 *
 * One login page for both:
 *
 * Admin:
 * users/{uid}
 * role === "admin"
 *
 * Customer:
 * customers/{uid}
 *
 * Admin  → /admin
 * Customer → /
 */
export async function loginUser(
  email: string,
  password: string
): Promise<LoginUserResult> {
  try {
    /**
     * STEP 1
     * Firebase Authentication login
     */
    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const firebaseUser = credential.user;

    /**
     * STEP 2
     * Check admin document
     *
     * users/{uid}
     */
    const adminRef = doc(
      db,
      "users",
      firebaseUser.uid
    );

    const adminSnap = await getDoc(adminRef);

    /**
     * If user is admin
     */
    if (
      adminSnap.exists() &&
      adminSnap.data()?.role === "admin"
    ) {
      return {
        user: firebaseUser,
        role: "admin",
        error: null,
      };
    }

    /**
     * STEP 3
     * Check customer document
     *
     * customers/{uid}
     */
    const customerRef = doc(
      db,
      "customers",
      firebaseUser.uid
    );

    const customerSnap = await getDoc(customerRef);

    /**
     * If customer exists
     */
    if (customerSnap.exists()) {
      return {
        user: firebaseUser,
        role: "customer",
        error: null,
      };
    }

    /**
     * Firebase account exists,
     * but no Firestore profile exists.
     *
     * Logout user for safety.
     */
    await signOut(auth);

    return {
      user: null,
      role: null,
      error: "No user profile found.",
    };
  } catch (error: unknown) {
    console.error("Login error:", error);

    return {
      user: null,
      role: null,
      error: getAuthErrorMessage(error),
    };
  }
}

/**
 * ============================
 * ADMIN LOGIN
 * ============================
 *
 * Kept for compatibility with
 * any old admin code.
 *
 * New /login page should use
 * loginUser() instead.
 */
export async function loginAdmin(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const firebaseUser = credential.user;

    const userRef = doc(
      db,
      "users",
      firebaseUser.uid
    );

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await signOut(auth);

      return {
        user: null,
        error: "Admin account is not authorized.",
      };
    }

    const data = userSnap.data();

    if (data.role !== "admin") {
      await signOut(auth);

      return {
        user: null,
        error: "You do not have admin access.",
      };
    }

    const adminUser: AdminUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || email,
      displayName:
        firebaseUser.displayName ||
        data.displayName ||
        "Admin",
      role: "admin",
      createdAt: data.createdAt,
    };

    return {
      user: adminUser,
      error: null,
    };
  } catch (error: unknown) {
    console.error("Admin login error:", error);

    return {
      user: null,
      error: getAuthErrorMessage(error),
    };
  }
}

/**
 * ============================
 * ADMIN LOGOUT
 * ============================
 */

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

/**
 * ============================
 * CUSTOMER LOGIN
 * ============================
 *
 * Kept for compatibility.
 *
 * New login page should use
 * loginUser().
 */
export async function loginCustomer(
  email: string,
  password: string
): Promise<{
  user: User | null;
  error: string | null;
}> {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    return {
      user: result.user,
      error: null,
    };
  } catch (error: unknown) {
    console.error("Customer login error:", error);

    return {
      user: null,
      error: getAuthErrorMessage(error),
    };
  }
}

/**
 * ============================
 * CUSTOMER SIGNUP
 * ============================
 *
 * Creates:
 *
 * Firebase Authentication user
 *
 * +
 *
 * Firestore:
 * customers/{uid}
 */
export async function signUpCustomer(
  email: string,
  password: string,
  displayName: string
): Promise<{
  user: User | null;
  error: string | null;
}> {
  try {
    /**
     * Create Firebase Auth account
     */
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    /**
     * Set Firebase display name
     */
    await updateProfile(result.user, {
      displayName: displayName.trim(),
    });

    /**
     * Create customer Firestore document
     */
    const customerRef = doc(
      db,
      "customers",
      result.user.uid
    );

    await setDoc(customerRef, {
      uid: result.user.uid,
      email: result.user.email,
      displayName: displayName.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      user: result.user,
      error: null,
    };
  } catch (error: unknown) {
    console.error("Customer signup error:", error);

    return {
      user: null,
      error: getAuthErrorMessage(error),
    };
  }
}

/**
 * ============================
 * AUTH STATE
 * ============================
 */

export function onAuthChange(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * ============================
 * CHECK ADMIN
 * ============================
 */

export async function checkIsAdmin(
  uid: string
): Promise<boolean> {
  try {
    if (!uid) {
      return false;
    }

    const adminRef = doc(
      db,
      "users",
      uid
    );

    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      return false;
    }

    const data = adminSnap.data();

    return data.role === "admin";
  } catch (error) {
    console.error(
      "Admin check failed:",
      error
    );

    return false;
  }
}

/**
 * ============================
 * CREATE ADMIN DOCUMENT
 * ============================
 *
 * Used when creating an admin
 * Firestore record.
 */
export async function ensureAdminExists(
  uid: string,
  email: string,
  displayName = "Admin"
): Promise<void> {
  const adminRef = doc(
    db,
    "users",
    uid
  );

  const adminSnap = await getDoc(adminRef);

  if (!adminSnap.exists()) {
    await setDoc(adminRef, {
      uid,
      email,
      displayName,
      role: "admin",
      createdAt: serverTimestamp(),
    });

    console.log(
      `Admin document created for ${email}`
    );
  }
}