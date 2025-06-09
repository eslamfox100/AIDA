
import { useState } from "react";
import { X, Shield, CheckCircle, XCircle, AlertTriangle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PermissionManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PermissionManager = ({ isOpen, onClose }: PermissionManagerProps) => {
  const [permissions, setPermissions] = useState({
    overlay: false,
    accessibility: false,
    background: true,
    storage: true
  });

  const requestPermission = (permissionType: keyof typeof permissions) => {
    // محاكاة طلب الصلاحية
    setTimeout(() => {
      setPermissions(prev => ({
        ...prev,
        [permissionType]: true
      }));
    }, 1000);
  };

  if (!isOpen) return null;

  const permissionsList = [
    {
      key: 'overlay' as keyof typeof permissions,
      name: 'العرض فوق التطبيقات الأخرى',
      description: 'يسمح للتطبيق بالظهور فوق التطبيقات الأخرى',
      required: true,
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      key: 'accessibility' as keyof typeof permissions,
      name: 'خدمات إمكانية الوصول',
      description: 'يسمح للتطبيق بالتفاعل مع التطبيقات الأخرى',
      required: true,
      icon: <Shield className="w-5 h-5" />
    },
    {
      key: 'background' as keyof typeof permissions,
      name: 'العمل في الخلفية',
      description: 'يسمح للتطبيق بالعمل عند إغلاق الشاشة',
      required: false,
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      key: 'storage' as keyof typeof permissions,
      name: 'الوصول للتخزين',
      description: 'حفظ الإعدادات وبيانات التطبيق',
      required: false,
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const allRequiredGranted = permissionsList
    .filter(p => p.required)
    .every(p => permissions[p.key]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyber-purple flex items-center gap-2">
              <Shield className="w-5 h-5" />
              إدارة الصلاحيات
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            يحتاج التطبيق لهذه الصلاحيات للعمل بشكل صحيح
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!allRequiredGranted && (
            <Alert className="border-destructive/20 bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                بعض الصلاحيات المطلوبة غير مفعلة. التطبيق قد لا يعمل بشكل صحيح.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {permissionsList.map((permission) => (
              <Card key={permission.key} className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-cyber-blue mt-1">
                        {permission.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{permission.name}</h4>
                          {permission.required && (
                            <Badge variant="destructive" className="text-xs">
                              مطلوب
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {permissions[permission.key] ? (
                        <CheckCircle className="w-5 h-5 text-cyber-green" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      {!permissions[permission.key] && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => requestPermission(permission.key)}
                          className="cyber-button text-xs"
                        >
                          تفعيل
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Status Summary */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className={`text-2xl mb-2 ${allRequiredGranted ? 'text-cyber-green' : 'text-destructive'}`}>
                  {allRequiredGranted ? <CheckCircle className="w-8 h-8 mx-auto" /> : <XCircle className="w-8 h-8 mx-auto" />}
                </div>
                <h3 className="font-semibold mb-1">
                  {allRequiredGranted ? 'جميع الصلاحيات مفعلة' : 'يتطلب صلاحيات إضافية'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {allRequiredGranted 
                    ? 'التطبيق جاهز للعمل بكامل ميزاته'
                    : 'فعل الصلاحيات المطلوبة لاستخدام التطبيق'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              إغلاق
            </Button>
            {!allRequiredGranted && (
              <Button
                onClick={() => {
                  // طلب جميع الصلاحيات المطلوبة
                  permissionsList
                    .filter(p => p.required && !permissions[p.key])
                    .forEach(p => requestPermission(p.key));
                }}
                className="flex-1 cyber-button bg-cyber-green/20 border-cyber-green text-cyber-green"
              >
                تفعيل الكل
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
