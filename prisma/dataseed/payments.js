"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsDataSeed = void 0;
/* eslint-disable prettier/prettier */
var client_1 = require("@prisma/client");
exports.paymentsDataSeed = [
    {
        amount: 29.99,
        note: 'Payment for August subscription',
        subscriptionId: 1,
        type: client_1.PaymentType.CREDIT_CARD,
        paidAt: new Date().toISOString(),
    },
    {
        amount: 19.99,
        note: 'Payment for September subscription',
        subscriptionId: 2,
        type: client_1.PaymentType.CREDIT_CARD,
        paidAt: new Date().toISOString(),
    },
    {
        amount: 19.99,
        note: 'Payment for September subscription',
        subscriptionId: 2,
        type: client_1.PaymentType.CREDIT_CARD,
        paidAt: new Date().toISOString(),
    },
    {
        amount: 19.99,
        note: 'Payment for September subscription',
        subscriptionId: 2,
        type: client_1.PaymentType.CREDIT_CARD,
        paidAt: new Date().toISOString(),
    },
    {
        amount: 39.99,
        note: 'Payment for August subscription renewal',
        subscriptionId: 3,
        type: client_1.PaymentType.CREDIT_CARD,
        paidAt: new Date().toISOString(),
    },
];
