import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Target, Users, BarChart, ArrowRight, Gift, Brain, School } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Landing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>LuckyWheel - Create Custom Prize Wheels & Random Pickers</title>
        <meta name="description" content="Create beautiful custom prize wheels for giveaways, classroom activities, team building, and decision making. Free online wheel spinner with customizable options and templates." />
        <meta name="keywords" content="prize wheel, wheel spinner, random picker, lucky draw, classroom tool, team picker" />
        <meta property="og:title" content="LuckyWheel - Custom Prize Wheel Generator" />
        <meta property="og:description" content="Create beautiful custom prize wheels for giveaways, classroom activities, team building, and decision making." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luckywheel.app" />
        <link rel="canonical" href="https://luckywheel.app" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "LuckyWheel",
              "description": "Create custom prize wheels for giveaways, classroom activities, team building, and decision making.",
              "url": "https://luckywheel.app",
              "applicationCategory": "UtilityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Customizable wheel segments",
                "Multiple templates",
                "Probability control",
                "Spin history tracking"
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('landing.title')}
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              {t('landing.description')}
            </p>
            <Link
              to="/wheel"
              className="inline-flex items-center px-8 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
            >
              {t('landing.start')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('landing.features.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-purple-50">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('landing.features.design.title')}</h3>
              <p className="text-gray-600">
                {t('landing.features.design.description')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-purple-50">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('landing.features.probability.title')}</h3>
              <p className="text-gray-600">
                {t('landing.features.probability.description')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-purple-50">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('landing.features.tracking.title')}</h3>
              <p className="text-gray-600">
                {t('landing.features.tracking.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('landing.useCases.title')}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('landing.useCases.giveaways.title')}</h3>
              <p className="text-gray-600">{t('landing.useCases.giveaways.description')}</p>
            </div>
            <div className="text-center p-6">
              <School className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('landing.useCases.education.title')}</h3>
              <p className="text-gray-600">{t('landing.useCases.education.description')}</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('landing.useCases.teamBuilding.title')}</h3>
              <p className="text-gray-600">{t('landing.useCases.teamBuilding.description')}</p>
            </div>
            <div className="text-center p-6">
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('landing.useCases.decisionMaking.title')}</h3>
              <p className="text-gray-600">{t('landing.useCases.decisionMaking.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('landing.cta.title')}</h2>
          <p className="text-xl text-purple-100 mb-8">
            {t('landing.cta.description')}
          </p>
          <Link
            to="/wheel"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-full text-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            {t('landing.cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Landing;