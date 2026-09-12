"use client";

import { useState } from "react";
import { Database, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seedDatabase } from "@/lib/admin/seed-data";
import { toast } from "sonner";

interface SeedDatabasePanelProps {
  onSeeded?: () => void;
}

export function SeedDatabasePanel({ onSeeded }: SeedDatabasePanelProps) {
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedDatabase();
      toast.success("Sample store data added successfully");
      onSeeded?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to seed database. Check Firebase rules and connection.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <Card className="border-dashed border-blue-300 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="size-5" />
          Initialize Store Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Your dashboard is empty. Load sample categories, products, customers, and orders to start managing your store.
        </p>
        <Button onClick={handleSeed} disabled={seeding}>
          {seeding && <Loader2 className="mr-2 size-4 animate-spin" />}
          Seed Sample Data
        </Button>
      </CardContent>
    </Card>
  );
}
