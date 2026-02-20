"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FaLaptop,
  FaMobileAlt,
  FaTabletAlt,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface Device {
  id: string;
  name: string;
  type: "desktop" | "mobile" | "tablet";
  lastActive: string;
  current: boolean;
}

interface LogoutDevicesModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LogoutDevicesModal({
  open,
  onClose,
}: LogoutDevicesModalProps) {
  const [loading, setLoading] = useState(false);

  // Static mock devices
  const devices: Device[] = [
    {
      id: "1",
      name: "Windows PC - Chrome",
      type: "desktop",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      name: "iPhone 13 - Safari",
      type: "mobile",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      name: "iPad Pro - Safari",
      type: "tablet",
      lastActive: "1 day ago",
      current: false,
    },
  ];

  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "mobile":
        return <FaMobileAlt className="w-5 h-5" />;
      case "tablet":
        return <FaTabletAlt className="w-5 h-5" />;
      default:
        return <FaLaptop className="w-5 h-5" />;
    }
  };

  const handleLogoutOthers = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Logged out from other devices");
      onClose();
    } catch (error) {
      toast.error("Failed to logout from other devices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-border/30 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Active Devices</DialogTitle>
          <DialogDescription>
            Devices currently logged into your account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`p-4 rounded-lg border transition-all ${
                device.current
                  ? "bg-primary/10 border-primary/30"
                  : "bg-muted/30 border-border/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      device.current ? "bg-primary/20" : "bg-muted/50"
                    }`}
                  >
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{device.name}</h4>
                      {device.current && (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <FaCheckCircle className="w-3 h-3" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {device.lastActive}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 glass border-border/30"
            disabled={loading}
          >
            Close
          </Button>
          <Button
            onClick={handleLogoutOthers}
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout Other Devices"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
