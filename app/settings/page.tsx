"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaImages, FaFolder, FaTrash, FaHdd, FaLaptop, FaLock, FaSignOutAlt, FaUserSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useLogout from "@/hooks/useLogout";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import ResetPasswordModal from "@/components/modals/ResetPasswordModal";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import LogoutDevicesModal from "@/components/modals/LogoutDevicesModal";

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useLogout();
  const { user } = useSelector((state: Rootstate) => state.auth);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showLogoutDevices, setShowLogoutDevices] = useState(false);

  // Static mock data
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
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
                  <p className="text-sm text-muted-foreground">Free Plan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Photos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-border/30 hover:border-primary/50 transition-all cursor-pointer group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                    <FaImages className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-gradient-primary">
                    {stats.totalPhotos.toLocaleString()}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">Total Photos</h3>
                <p className="text-sm text-muted-foreground">Across all folders</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Folders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="glass border-border/30 hover:border-accent/50 transition-all cursor-pointer group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-all">
                    <FaFolder className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-3xl font-bold text-gradient-primary">
                    {stats.totalFolders}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">Total Folders</h3>
                <p className="text-sm text-muted-foreground">Organized collections</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trash */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass border-border/30 hover:border-destructive/50 transition-all cursor-pointer group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-all">
                    <FaTrash className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-gradient-primary block">
                      {stats.trashPhotos}
                    </span>
                    <span className="text-sm text-muted-foreground">{stats.trashSize} GB</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">In Trash</h3>
                <p className="text-sm text-muted-foreground">Photos & storage</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Storage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8"
        >
          <Card className="glass border-border/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FaHdd className="text-primary" />
                    Storage Usage
                  </CardTitle>
                  <CardDescription>
                    {stats.storageUsed} GB of {stats.storageLimit} GB used
                  </CardDescription>
                </div>
                <span className="text-2xl font-bold text-gradient-primary">
                  {storagePercentage.toFixed(1)}%
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${storagePercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full ${
                    storagePercentage > 90
                      ? "bg-destructive"
                      : storagePercentage > 70
                        ? "bg-yellow-500"
                        : "bg-linear-to-r from-primary to-accent"
                  }`}
                />
              </div>
              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <span>{stats.storageUsed} GB used</span>
                <span>{(stats.storageLimit - stats.storageUsed).toFixed(1)} GB free</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Devices & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FaLaptop className="text-primary" />
                Active Devices
              </CardTitle>
              <CardDescription>Devices currently logged into your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gradient-primary mb-1">
                    {stats.activeDevices}
                  </p>
                  <p className="text-sm text-muted-foreground">Devices logged in</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutDevices(true)}
                  className="glass border-border/30 hover:border-primary/50"
                >
                  Logout Other Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle className="text-xl">Account Actions</CardTitle>
              <CardDescription>Manage your account security and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Reset Password */}
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

              {/* Logout */}
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
                  onClick={logout}
                  className="glass border-border/30 hover:border-accent/50"
                >
                  Logout
                </Button>
              </div>

              {/* Delete Account */}
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
          </Card>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <ResetPasswordModal open={showResetPassword} onClose={() => setShowResetPassword(false)} />
      <DeleteAccountModal open={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />
      <LogoutDevicesModal open={showLogoutDevices} onClose={() => setShowLogoutDevices(false)} />
    </div>
  );
}
