import { Router } from 'express';
import CoinController from './coin/controller';
import WalletController from './wallet/controller';
import TransactionController from './transaction/controller';

const router = Router();
router.use('/coin', CoinController);
router.use('/:address', WalletController);
router.use('/transaction', TransactionController);

export default router;
