import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export const QDayCounter: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    years: 9,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const qdayDate = new Date(2035, 0, 1).getTime();
      const now = new Date().getTime();
      const difference = qdayDate - now;

      if (difference > 0) {
        setTimeLeft({
          years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
          days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 365),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="border-t border-slate-800 bg-gradient-to-r from-red-50 to-orange-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-slate-900 border border-slate-800 p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl font-bold text-red-600">Q-Day Countdown</h2>
          </div>
          
          <p className="mb-8 text-slate-300">
            Estimated time until quantum computers can break RSA encryption and decrypt data collected today:
          </p>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              { label: 'Years', value: timeLeft.years },
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-transparent p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{item.value.toString().padStart(2, '0')}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Your data encrypted today with classical algorithms (RSA, ECC) could be vulnerable after 2035 if you don't migrate to post-quantum cryptography.
          </p>
        </div>
      </div>
    </section>
  );
};
