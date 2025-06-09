# Shahi Pickle - Complete E-commerce Platform

A full-stack e-commerce platform for premium organic pickles built with Next.js, Supabase, and modern web technologies.

## 🚀 Features

### Frontend Features
- **Modern Design**: Apple-level aesthetics with Indian cultural elements
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Automatic theme switching with manual toggle
- **Product Catalog**: Complete product management with variants
- **Shopping Cart**: Persistent cart with real-time updates
- **User Authentication**: Phone OTP-based secure login
- **Checkout Flow**: Multi-step checkout process
- **Order Management**: Complete order tracking and history
- **Reviews & Ratings**: Customer feedback system
- **Wishlist**: Save favorite products
- **Custom Recipes**: Build-your-own pickle functionality

### Backend Features
- **Supabase Database**: PostgreSQL with Row Level Security
- **Real-time Updates**: Live data synchronization
- **File Storage**: Image and document management
- **Authentication**: Secure user management
- **API Integration**: RESTful APIs for all operations
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Robust error management

### Admin Panel Features
- **Dashboard**: Comprehensive analytics and insights
- **Order Management**: Process and track all orders
- **Product Management**: Add, edit, and manage products
- **Customer Management**: View and manage customer data
- **Analytics**: Sales reports and business insights
- **Inventory Management**: Stock tracking and alerts
- **Settings**: Configure store settings and preferences
- **User Management**: Admin user roles and permissions

### Business Features
- **Multi-Currency**: Support for multiple currencies
- **Payment Integration**: Razorpay for secure payments
- **Shipping Integration**: ShipRocket for logistics
- **Tax Management**: GST and tax calculations
- **Coupon System**: Discount codes and promotions
- **Newsletter**: Email marketing integration
- **SEO Optimized**: Search engine friendly
- **Performance**: Fast loading and optimized

## 🛠 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI components
- **Lucide React**: Beautiful icons
- **Recharts**: Data visualization
- **Sonner**: Toast notifications

### Backend
- **Supabase**: Backend-as-a-Service
- **PostgreSQL**: Relational database
- **Row Level Security**: Data security
- **Real-time**: Live data updates
- **Storage**: File management
- **Edge Functions**: Serverless functions

### Integrations
- **Razorpay**: Payment processing
- **ShipRocket**: Shipping management
- **Email**: SMTP integration
- **Analytics**: Google Analytics
- **Social**: Facebook Pixel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Razorpay account (for payments)
- ShipRocket account (for shipping)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shahi-pickle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - Supabase URL and keys
   - Razorpay credentials
   - ShipRocket credentials
   - SMTP settings

4. **Database Setup**
   - Create a new Supabase project
   - Run the migration files in `supabase/migrations/`
   - Seed the database with sample data

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🗄 Database Schema

### Core Tables
- **profiles**: User profiles and preferences
- **products**: Product catalog with variants
- **categories**: Product categories
- **orders**: Order management
- **order_items**: Order line items
- **cart_items**: Shopping cart persistence
- **addresses**: User shipping addresses
- **reviews**: Product reviews and ratings
- **inventory**: Stock management
- **coupons**: Discount codes
- **custom_recipes**: Custom pickle recipes
- **admin_users**: Admin panel access

### Security
- Row Level Security (RLS) enabled on all tables
- User-specific data access policies
- Admin-only access for management tables
- Secure authentication with Supabase Auth

## 🔐 Authentication

### User Authentication
- Phone OTP-based login
- Secure session management
- Profile management
- Address book
- Order history

### Admin Authentication
- Role-based access control
- Admin user management
- Secure admin panel access
- Activity logging

## 💳 Payment Integration

### Razorpay Features
- Credit/Debit cards
- UPI payments
- Net banking
- Digital wallets
- International cards
- EMI options
- Secure tokenization

### Payment Flow
1. Cart checkout
2. Address selection
3. Payment method choice
4. Secure payment processing
5. Order confirmation
6. Email notifications

## 🚚 Shipping Integration

### ShipRocket Features
- Multi-courier support
- Real-time rate calculation
- Automatic label generation
- Tracking integration
- International shipping
- Delivery estimates

### Shipping Flow
1. Order processing
2. Automatic shipping calculation
3. Label generation
4. Tracking number assignment
5. Customer notifications
6. Delivery confirmation

## 📊 Admin Panel

### Dashboard
- Sales analytics
- Order statistics
- Customer insights
- Revenue tracking
- Performance metrics

### Order Management
- Order processing
- Status updates
- Shipping management
- Customer communication
- Refund processing

### Product Management
- Product catalog
- Inventory tracking
- Price management
- Category organization
- Image management

### Customer Management
- Customer profiles
- Order history
- Communication logs
- Loyalty tracking
- Support tickets

## 🎨 Design System

### Colors
- **Saffron**: Primary brand color
- **Golden**: Accent color
- **Deep Green**: Secondary color
- **Warm Brown**: Tertiary color
- **Cream**: Background color

### Typography
- **Inter**: Primary font family
- **Playfair Display**: Display font for headings
- Responsive font sizes
- Proper line heights

### Components
- Consistent spacing (8px grid)
- Rounded corners (0.75rem default)
- Subtle shadows
- Smooth animations
- Accessible color contrast

## 🔧 Configuration

### Environment Variables
See `.env.example` for all required environment variables.

### Supabase Setup
1. Create a new Supabase project
2. Copy the project URL and anon key
3. Run the migration files
4. Configure RLS policies
5. Set up storage buckets

### Payment Setup
1. Create Razorpay account
2. Get API keys from dashboard
3. Configure webhook endpoints
4. Test payment flow

### Shipping Setup
1. Create ShipRocket account
2. Get API credentials
3. Configure shipping zones
4. Set up rate calculations

## 📱 Mobile Optimization

### Progressive Web App (PWA)
- Offline functionality
- App-like experience
- Push notifications
- Home screen installation

### Mobile Features
- Touch-friendly interface
- Swipe gestures
- Mobile payments
- Location services
- Camera integration

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push
4. Custom domain setup

### Database Migration
1. Run migrations on production
2. Seed production data
3. Configure backups
4. Monitor performance

### Performance Optimization
- Image optimization
- Code splitting
- Lazy loading
- CDN integration
- Caching strategies

## 📈 Analytics & Monitoring

### Built-in Analytics
- Sales tracking
- Customer behavior
- Product performance
- Revenue analysis
- Conversion rates

### External Integrations
- Google Analytics
- Facebook Pixel
- Error tracking
- Performance monitoring
- User feedback

## 🔒 Security

### Data Protection
- HTTPS everywhere
- Data encryption
- Secure authentication
- Input validation
- SQL injection prevention

### Privacy Compliance
- GDPR compliance
- Cookie consent
- Data retention policies
- User data export
- Right to deletion

## 🧪 Testing

### Test Coverage
- Unit tests
- Integration tests
- E2E tests
- Performance tests
- Security tests

### Quality Assurance
- Code reviews
- Automated testing
- Manual testing
- User acceptance testing
- Performance monitoring

## 📚 Documentation

### API Documentation
- Complete API reference
- Authentication guide
- Error handling
- Rate limiting
- Webhook documentation

### User Guides
- Customer guide
- Admin guide
- Developer guide
- Troubleshooting
- FAQ

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits
- Code reviews

## 📞 Support

### Getting Help
- Documentation
- GitHub Issues
- Community Discord
- Email support
- Video tutorials

### Maintenance
- Regular updates
- Security patches
- Performance improvements
- Feature additions
- Bug fixes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- Shadcn for the UI components
- All contributors and supporters

---

**Shahi Pickle** - Bringing authentic flavors to the digital world! 🥒✨