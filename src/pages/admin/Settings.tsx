import { useState } from "react";
import { motion } from "framer-motion";
import {
    Save,
    Building,
    Palette,
    CreditCard,
    Mail,
    Globe,
    Bell,
    Shield,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
    const { toast } = useToast();

    const [generalSettings, setGeneralSettings] = useState({
        siteName: "TamanWEB",
        siteDescription: "Marketplace template website profesional",
        contactEmail: "hello@tamanweb.com",
        supportEmail: "support@tamanweb.com",
    });

    const [seoSettings, setSeoSettings] = useState({
        metaTitle: "TamanWEB - Template Website Profesional",
        metaDescription: "Koleksi template website siap pakai, modern, responsif, dan SEO-friendly.",
        ogImage: "",
    });

    const [paymentSettings, setPaymentSettings] = useState({
        currency: "IDR",
        bankName: "Bank Central Asia",
        accountNumber: "1234567890",
        accountName: "PT TamanWEB Indonesia",
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailOnOrder: true,
        emailOnSignup: true,
        emailOnReview: false,
        slackNotifications: false,
    });

    const handleSave = () => {
        toast({
            title: "Settings saved",
            description: "Your settings have been saved successfully.",
        });
    };

    return (
        <AdminLayout title="Settings" description="Konfigurasi aplikasi TamanWEB">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Tabs defaultValue="general" className="space-y-6">
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-flex">
                        <TabsTrigger value="general" className="gap-2">
                            <Building className="w-4 h-4" />
                            <span className="hidden sm:inline">General</span>
                        </TabsTrigger>
                        <TabsTrigger value="seo" className="gap-2">
                            <Globe className="w-4 h-4" />
                            <span className="hidden sm:inline">SEO</span>
                        </TabsTrigger>
                        <TabsTrigger value="payment" className="gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="hidden sm:inline">Payment</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2">
                            <Bell className="w-4 h-4" />
                            <span className="hidden sm:inline">Notifications</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* General Settings */}
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Settings</CardTitle>
                                <CardDescription>
                                    Pengaturan umum untuk website TamanWEB
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="siteName">Site Name</Label>
                                        <Input
                                            id="siteName"
                                            value={generalSettings.siteName}
                                            onChange={(e) =>
                                                setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contactEmail">Contact Email</Label>
                                        <Input
                                            id="contactEmail"
                                            type="email"
                                            value={generalSettings.contactEmail}
                                            onChange={(e) =>
                                                setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="siteDescription">Site Description</Label>
                                    <Textarea
                                        id="siteDescription"
                                        value={generalSettings.siteDescription}
                                        onChange={(e) =>
                                            setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })
                                        }
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Support Email</Label>
                                    <Input
                                        id="supportEmail"
                                        type="email"
                                        value={generalSettings.supportEmail}
                                        onChange={(e) =>
                                            setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                                        }
                                    />
                                </div>

                                <Button onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SEO Settings */}
                    <TabsContent value="seo">
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                                <CardDescription>
                                    Optimisasi mesin pencari untuk visibilitas yang lebih baik
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="metaTitle">Default Meta Title</Label>
                                    <Input
                                        id="metaTitle"
                                        value={seoSettings.metaTitle}
                                        onChange={(e) =>
                                            setSeoSettings({ ...seoSettings, metaTitle: e.target.value })
                                        }
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {seoSettings.metaTitle.length}/60 characters recommended
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription">Default Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        value={seoSettings.metaDescription}
                                        onChange={(e) =>
                                            setSeoSettings({ ...seoSettings, metaDescription: e.target.value })
                                        }
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {seoSettings.metaDescription.length}/160 characters recommended
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ogImage">Default OG Image URL</Label>
                                    <Input
                                        id="ogImage"
                                        value={seoSettings.ogImage}
                                        onChange={(e) =>
                                            setSeoSettings({ ...seoSettings, ogImage: e.target.value })
                                        }
                                        placeholder="https://tamanweb.com/og-image.jpg"
                                    />
                                </div>

                                <Button onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payment Settings */}
                    <TabsContent value="payment">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Settings</CardTitle>
                                <CardDescription>
                                    Konfigurasi pembayaran dan rekening bank
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select
                                        value={paymentSettings.currency}
                                        onValueChange={(value) =>
                                            setPaymentSettings({ ...paymentSettings, currency: value })
                                        }
                                    >
                                        <SelectTrigger id="currency">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="IDR">Indonesian Rupiah (IDR)</SelectItem>
                                            <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                            <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bankName">Bank Name</Label>
                                        <Input
                                            id="bankName"
                                            value={paymentSettings.bankName}
                                            onChange={(e) =>
                                                setPaymentSettings({ ...paymentSettings, bankName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accountNumber">Account Number</Label>
                                        <Input
                                            id="accountNumber"
                                            value={paymentSettings.accountNumber}
                                            onChange={(e) =>
                                                setPaymentSettings({ ...paymentSettings, accountNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="accountName">Account Name</Label>
                                    <Input
                                        id="accountName"
                                        value={paymentSettings.accountName}
                                        onChange={(e) =>
                                            setPaymentSettings({ ...paymentSettings, accountName: e.target.value })
                                        }
                                    />
                                </div>

                                <Button onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>
                                    Kelola preferensi notifikasi email dan alert
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Email on New Order</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Kirim email saat ada pesanan baru
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.emailOnOrder}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings({ ...notificationSettings, emailOnOrder: checked })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Email on New Signup</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Kirim email saat ada user baru mendaftar
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.emailOnSignup}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings({ ...notificationSettings, emailOnSignup: checked })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Email on New Review</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Kirim email saat ada review template baru
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.emailOnReview}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings({ ...notificationSettings, emailOnReview: checked })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Slack Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Kirim notifikasi ke channel Slack
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.slackNotifications}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings({ ...notificationSettings, slackNotifications: checked })
                                        }
                                    />
                                </div>

                                <Button onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </AdminLayout>
    );
}
