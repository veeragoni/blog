"use client";

import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, BookOpen } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Publishing Platforms</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Github className="h-5 w-5" />
                  <Label htmlFor="github">GitHub Pages</Label>
                </div>
                <Switch id="github" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-5 w-5" />
                  <Label htmlFor="linkedin">LinkedIn</Label>
                </div>
                <Switch id="linkedin" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <Switch id="medium" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Editor Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="preview">Real-time Preview</Label>
                <Switch id="preview" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autosave">Auto-save</Label>
                <Switch id="autosave" defaultChecked />
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
}