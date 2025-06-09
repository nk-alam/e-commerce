import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 98765 43210', '+91 87654 32109'],
    description: 'Call us for immediate assistance',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['hello@shahipickle.com', 'orders@shahipickle.com'],
    description: 'Send us your questions anytime',
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['Shahi Pickle Kitchen', 'Malda, West Bengal 732101', 'India'],
    description: 'Visit our traditional kitchen',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Saturday: 9:00 AM - 6:00 PM', 'Sunday: 10:00 AM - 4:00 PM'],
    description: 'IST (Indian Standard Time)',
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display mb-4">
          Get in <span className="text-saffron">Touch</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          We're here to help with your pickle needs. Whether you have questions about our products, 
          need help with custom orders, or want to learn more about our traditional recipes, 
          don't hesitate to reach out.
        </p>
      </div>

      <div className="grid gap-6">
        {contactMethods.map((method) => (
          <Card key={method.title}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                  <method.icon className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <div className="font-semibold">{method.title}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {method.description}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {method.details.map((detail, index) => (
                  <div key={index} className="text-sm">
                    {detail}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <Card className="bg-saffron/5 border-saffron/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-saffron mt-1" />
            <div>
              <h3 className="font-semibold mb-2">International Customers</h3>
              <p className="text-sm text-muted-foreground">
                We ship worldwide! For international orders and shipping inquiries, 
                please email us at international@shahipickle.com or use our contact form.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}