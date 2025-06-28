/* eslint-disable prettier/prettier */
import { PaymentType } from '@prisma/client';

export const paymentsDataSeed = [
  {
    amount: 29.99,
    note: 'Payment for August subscription',
    subscriptionId: 1,
    type: PaymentType.CREDIT_CARD,
    paidAt: new Date().toISOString(),
  },
  {
    amount: 19.99,
    note: 'Payment for September subscription',
    subscriptionId: 2,
    type: PaymentType.CREDIT_CARD,
    paidAt: new Date().toISOString(),
  },
  {
    amount: 19.99,
    note: 'Payment for September subscription',
    subscriptionId: 2,
    type: PaymentType.CREDIT_CARD,
    paidAt: new Date().toISOString(),
  },
  {
    amount: 19.99,
    note: 'Payment for September subscription',
    subscriptionId: 2,
    type: PaymentType.CREDIT_CARD,
    paidAt: new Date().toISOString(),
  },
  {
    amount: 39.99,
    note: 'Payment for August subscription renewal',
    subscriptionId: 3,
    type: PaymentType.CREDIT_CARD,
    paidAt: new Date().toISOString(),
  },
];
