"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaImages, FaFolder, FaTrash, FaHdd, FaLaptop, FaLock, FaSignOutAlt, FaUserSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import useLogout from "@/hooks/useLogout";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import ResetPasswordModal from "@/components/modals/ResetPasswordModal";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import LogoutDevicesModal from "@/components/modals/LogoutDevicesModal";
import LogoutModal from "@/components/modals/LogoutModal";

export default function SettingsPage() {
  const { logout } = useLogout();
  const { user } = useSelector((state: Rootstate) => state.auth);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showLogoutDevices, setShowLogoutDevices] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    photoMetrics: true,
    accountManagement: true,
    loginSecurity: true,
  });

  const stats = {
    totalPhotos: 1247,
    totalFolders: 23,
    storageUsed: 4.7,
    storageLimit: 15,
    trashPhotos: 45,
    trashSize: 0.3,
    activeDevices: 3,
  };

  const storagePercentage = (stats.storageUsed / stats.storageLimit) * 100;
  const storageFree = stats.storageLimit - stats.storageUsed;

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle className="text-xl">Account Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-lg">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Free Plan • {storageFree.toFixed(1)} GB remaining
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="glass border-border/30">
            <CardHeader
              className="cursor-pointer hover:bg-muted/20 transition-all"
              onClick={() => toggleSection("photoMetrics")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Photo Metrics</CardTitle>
                  <CardDescription>Your storage and photo statistics</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedSections.photoMetrics ? (
                    <FaChevronUp className="w-5 h-5" />
                  ) : (
                    <FaChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <AnimatePresence>
              {expandedSections.photoMetrics && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FaHdd className="text-primary w-5 h-5" />
                          <h3 className="font-semibold text-lg">Storage Usage</h3>
                        </div>
                        <span className="text-2xl font-bold text-gradient-primary">
                          {storagePercentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${storagePercentage}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full rounded-full ${
                            storagePercentage > 90
                              ? "bg-destructive"
                              : storagePercentage > 70
                                ? "bg-yellow-500"
                                : "bg-linear-to-r from-primary to-accent"
                          }`}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{stats.storageUsed} GB used</span>
                        <span>{storageFree.toFixed(1)} GB free</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FaImages className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-2xl font-bold text-gradient-primary">
                            {stats.totalPhotos.toLocaleString()}
                          </span>
                        </div>
                        <h4 className="font-semibold mb-1">Total Photos</h4>
                        <p className="text-sm text-muted-foreground">Across all folders</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-lg bg-accent/10">
                            <FaFolder className="w-5 h-5 text-accent" />
                          </div>
                          <span className="text-2xl font-bold text-gradient-primary">
                            {stats.totalFolders}
                          </span>
                        </div>
                        <h4 className="font-semibold mb-1">Total Folders</h4>
                        <p className="text-sm text-muted-foreground">Organized collections</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-lg bg-destructive/10">
                            <FaTrash className="w-5 h-5 text-destructive" />
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gradient-primary block">
                              {stats.trashPhotos}
                            </span>
                            <span className="text-xs text-muted-foreground">{stats.trashSize} GB</span>
                          </div>
                        </div>
                        <h4 className="font-semibold mb-1">In Trash</h4>
                        <p className="text-sm text-muted-foreground">Photos & storage</p>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="glass border-border/30">
            <CardHeader
              className="cursor-pointer hover:bg-muted/20 transition-all"
              onClick={() => toggleSection("loginSecurity")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Login & Security</CardTitle>
                  <CardDescription>Manage your devices and password</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedSections.loginSecurity ? (
                    <FaChevronUp className="w-5 h-5" />
                  ) : (
                    <FaChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <AnimatePresence>
              {expandedSections.loginSecurity && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FaLaptop className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Active Devices</h4>
                          <p className="text-sm text-muted-foreground">
                            {stats.activeDevices} devices logged in
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowLogoutDevices(true)}
                        className="glass border-border/30 hover:border-primary/50"
                      >
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FaLock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Reset Password</h4>
                          <p className="text-sm text-muted-foreground">Change your account password</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowResetPassword(true)}
                        className="glass border-border/30 hover:border-primary/50"
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="glass border-border/30">
            <CardHeader
              className="cursor-pointer hover:bg-muted/20 transition-all"
              onClick={() => toggleSection("accountManagement")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Account Management</CardTitle>
                  <CardDescription>Logout and account deletion options</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedSections.accountManagement ? (
                    <FaChevronUp className="w-5 h-5" />
                  ) : (
                    <FaChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <AnimatePresence>
              {expandedSections.accountManagement && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <FaSignOutAlt className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Logout</h4>
                          <p className="text-sm text-muted-foreground">Sign out of this device</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowLogout(true)}
                        className="glass border-border/30 hover:border-accent/50"
                      >
                        Logout
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-all border border-destructive/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-destructive/10">
                          <FaUserSlash className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-destructive">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all data
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => setShowDeleteAccount(true)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </motion.div>

      <ResetPasswordModal open={showResetPassword} onClose={() => setShowResetPassword(false)} />
      <DeleteAccountModal open={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />
      <LogoutDevicesModal open={showLogoutDevices} onClose={() => setShowLogoutDevices(false)} />
      <LogoutModal 
        open={showLogout} 
        onClose={() => setShowLogout(false)} 
        onConfirm={() => {
          setShowLogout(false);
          logout();
        }} 
      />
    </div>
  );
}
