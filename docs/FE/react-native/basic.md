# React-Native基本用法

[[TOC]]

## payment
```js
import RNIap, {
  purchaseUpdatedListener,
  InAppPurchase,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';
export default function usePayment({
  purchaseUpdatedHandler,
  purchaseErrorHandler,
}: IProps) {
  let purchaseUpdateSubscription = useRef<any>(null);
  let purchaseErrorSubscription = useRef<any>(null);

  const init = async () => {
    try {
      const result = await RNIap.initConnection();
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription.current = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        if (purchase.transactionId) {
          purchaseUpdatedHandler && purchaseUpdatedHandler(purchase);
        }
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.log('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
        }
      },
    );

    purchaseErrorSubscription.current = purchaseErrorListener(
      async (error: PurchaseError) => {
        purchaseErrorHandler && purchaseErrorHandler(error);
      },
    );
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      init();
    }
    return () => {
      purchaseUpdateSubscription?.current?.remove();
      purchaseErrorSubscription?.current?.remove();
      RNIap.endConnection();
    };
  }, [purchaseUpdatedHandler, purchaseErrorHandler]);

  const pay = async (sku: string) => {
    await RNIap.clearTransactionIOS();
    await RNIap.getProducts([sku]);
    await RNIap.requestPurchase(sku, false);
  };

  return {
    pay,
  };
}
```

