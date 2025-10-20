import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { PaymentCheckoutForm } from './payment-checkout-form';
import { paymentService } from '@/services/payment.service';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2Icon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
);

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  workOrderId: string;
  amount: number;
  workOrderNumber: string;
  onPaymentSuccess?: () => void;
}

export function PaymentModal({
  open,
  onClose,
  workOrderId,
  amount,
  workOrderNumber,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open && !clientSecret) {
      initializePayment();
    }
  }, [open]);

  const initializePayment = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await paymentService.createPaymentIntent({
        amount,
        workOrderId,
        description: `Payment for Work Order ${workOrderNumber}`,
      });

      setClientSecret(response.clientSecret);
      setPaymentIntentId(response.paymentIntentId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = async () => {
    try {
      await paymentService.confirmPayment({
        paymentIntentId,
        workOrderId,
      });

      setSuccess(true);

      setTimeout(() => {
        onPaymentSuccess?.();
        handleClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to confirm payment');
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleClose = () => {
    setClientSecret('');
    setPaymentIntentId('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl border-slate-700 bg-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Payment for Work Order #{workOrderNumber}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Complete your payment securely with Stripe
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
            <span className="text-slate-300">Total Amount:</span>
            <span className="text-2xl font-bold text-teal-400">
              ${amount.toFixed(2)}
            </span>
          </div>

          {error && (
            <Alert variant="destructive" className="border-red-500/50 bg-red-950/50">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-emerald-500/50 bg-emerald-950/50">
              <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
              <AlertDescription className="text-emerald-300">
                Payment processed successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2Icon className="h-8 w-8 animate-spin text-teal-500" />
              <span className="ml-3 text-slate-300">
                Initializing payment...
              </span>
            </div>
          )}

          {!isLoading && clientSecret && !success && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#14b8a6',
                    colorBackground: '#1e293b',
                    colorText: '#f1f5f9',
                    colorDanger: '#ef4444',
                    fontFamily: 'system-ui, sans-serif',
                    borderRadius: '0.5rem',
                  },
                },
              }}
            >
              <PaymentCheckoutForm
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </Elements>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
