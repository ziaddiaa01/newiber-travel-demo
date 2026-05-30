import { createBrowserRouter , Navigate , Link } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import App from './App';
import { 
  fetchServices, 
  fetchTestimonials, 
  fetchFAQs, 
  getDestinations, // Added,
  getAdminServices,
  getAdminTestimonials,
  getAdminFAQs,
  getAdminContacts 
} from './services/api'; // added admin API functions
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const VIP = lazy(() => import('./pages/VIP'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ServicesManager = lazy(() => import('./pages/admin/ServicesManager'));
const TestimonialsManager = lazy(() => import('./pages/admin/TestimonialsManager'));
const FAQsManager = lazy(() => import('./pages/admin/FAQsManager'));
const ContactsManager = lazy(() => import('./pages/admin/ContactsManager'));

// Loaders
export const homeLoader = async () => {
  // We trigger both requests in parallel for better performance
  const [servicesRes, testimonialsRes , destinationsRes] = await Promise.all([
    fetchServices(),
    fetchTestimonials(),
    getDestinations(),
  ]);

  return {
    services: servicesRes.data,
    testimonials: testimonialsRes.data,
    destinations: destinationsRes.data, // Shared downstream to home view components
  };
};
// Admin loaders (protected)
const adminServicesLoader = async () => {
  const { data } = await getAdminServices();
  return { services: data };
};

const adminTestimonialsLoader = async () => {
  const { data } = await getAdminTestimonials();
  return { testimonials: data };
};

const adminFAQsLoader = async () => {
  const { data } = await getAdminFAQs();
  return { faqs: data };
};

const adminContactsLoader = async () => {
  const { data } = await getAdminContacts();
  return { contacts: data };
};

const servicesLoader = async () => {
  const services = await fetchServices();
  return { services };
};





// If fetchServices returns axios response
const vipLoader = async () => {
  const response = await fetchServices(); // axios response object
  const allServices = response.data;      // extract the actual array
  const vipServices = allServices.filter(service => service.isVip === true);
  return { services: vipServices };       // return the filtered array wrapped in an object
};
const serviceDetailLoader = async ({ params }) => {
  // We use Promise.all to fetch both at the same time (faster)
  const [detailRes, listRes] = await Promise.all([
    fetchService(params.id),
    fetchServices()
  ]);

  return { 
    service: detailRes.data, 
    allServices: listRes.data // This provides the data for the bottom list
  };
};

const faqLoader = async () => {
  const faqs = await fetchFAQs();
  return { faqs };
};

const testimonialsLoader = async () => {
  const testimonials = await fetchTestimonials();
  return { testimonials };
};


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
        loader: homeLoader,
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'why-us',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <WhyUs />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>
        ),
        loader: servicesLoader,
      },
      {
        path: 'services/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ServiceDetail />
          </Suspense>
        ),
        loader: serviceDetailLoader,
      },
      {
        path: 'vip',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VIP />
          </Suspense>
        ),
        loader: vipLoader, // reuse services loader, filter VIP in component
      },
      {
        path: 'testimonials',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Testimonials />
          </Suspense>
        ),
        loader: testimonialsLoader,
      },
      {
        path: 'faq',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FAQ />
          </Suspense>
        ),
        loader: faqLoader,
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: 'privacy',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Privacy />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <AdminLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ServicesManager />
          </Suspense>
        ),
        loader: adminServicesLoader,
      },
      {
        path: 'testimonials',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TestimonialsManager />
          </Suspense>
        ),
        loader: adminTestimonialsLoader,
      },
      {
        path: 'faqs',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FAQsManager />
          </Suspense>
        ),
        loader: adminFAQsLoader,
      },
      {
        path: 'contacts',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactsManager />
          </Suspense>
        ),
        loader: adminContactsLoader,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

// Error boundary component
function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-600">Something went wrong.</p>
        <Link to="/" className="text-blue-600 underline mt-4 block">Go back home</Link>
      </div>
    </div>
  );
}
