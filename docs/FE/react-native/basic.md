# React-Native基本用法

[[TOC]]

## Android & ios 安装
### ios
打开Xcode -> Product -> Scheme -> Edit Scheme... -> Run -> Info -> Build Configuration改成Release -> Close -> 在真机上运行 -> 安装完成后需要改回Debug

### Android
打开Android Studio -> Build -> Generate Signed Bundle / APK... -> 选择APK -> Next -> Key store path 选择项目android/app文件夹下的mentee-app.keystore,password/alias都填**账号密码** -> Next -> Build Variants选择release,Signature Versions 只勾选V1（个别应用商店可以接受V2签名，比如华为，Android11只能安装v2签名过的apk） -> Finish -> 将app-release.apk放到Android手机上安装或上传到应用商店

**签名要注意,要和以前保持一致，不然后续可能会有问题**

## 切换页面触发刷新
```js
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // 方法
    });
    return unsubscribe;
  }, [navigation]);
```

## 内嵌webview
使用**react-native-webview**
```js
  const innerScript = `
    window.App = {
      platform: '${Platform.OS}',
      payment: {
        apple: (orderId,appleProductId) => window.ReactNativeWebView.postMessage(JSON.stringify({payment:{apple:{orderId,appleProductId}}})),
        wechat: (orderId) => window.ReactNativeWebView.postMessage(JSON.stringify({payment:{wechat:orderId}}))
      },
      navigation:{
        navigate: (screen) => window.ReactNativeWebView.postMessage(JSON.stringify({navigation:{navigate:{screen}}})),
        goBack: () => window.ReactNativeWebView.postMessage(JSON.stringify({navigation:{goBack:1}})),
        linkTo: (url) => window.ReactNativeWebView.postMessage(JSON.stringify({navigation:{linkTo:url}})),
      },
    };
  `;

  return judge() ? (
    <WebView
      injectedJavaScriptBeforeContentLoaded={innerScript}
      onMessage={handleMessage}
      startInLoadingState={true}
      source={{
        uri: url,
      }}
      mixedContentMode="always"
      userAgent={`Android`}
      ref={webviewRef}
      onNavigationStateChange={onNavigationStateChange}
      onLoadProgress={(e) => {
        Platform.OS === 'android' && changeTitle(e.nativeEvent);
      }}
      onLoadEnd={() => {
        setLoad(true);
      }}
      onError={handleWebViewError}
      onHttpError={handleWebViewError}
      allowsBackForwardNavigationGestures={true}
      contentMode="mobile"
      sharedCookiesEnabled={true}
    ></WebView>
```

## payment 支付封装
使用**react-native-iap**
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

## 年月日组件
**SlideupMenu** 弹窗蒙层组件
```js

const styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
    color: '#15161F',
    lineHeight: 24,
  },
  timeBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  timeFont: {
    color: '#6E727A',
  },
  inputBody: {
    marginTop: 18,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    height: 126,
    flexGrow: 1,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderColor: 'white',
    marginBottom: 21,
    fontSize: 12,
    lineHeight: 17,
    width: '100%',
    marginTop: 10,
  },
  sumbitBtn: {
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  arrowDown: {
    width: 10,
    height: 10,
  },
  mark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(21, 22, 31, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerBody: {
    height: 260,
    position: 'relative',
    flexDirection: 'row',
  },
});

export default function Process({ navigation, route }: any) {
  const [date, setDate] = useState<any>(dayjs().format('YYYY-MM-DD'));
  const [visiable, setVisiable] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  // const navigation = useNavigation();
  const scrollerRef = useRef<any>(null);
  const scrollerRefDay = useRef<any>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs('2021-1-1').tz());
  const [year, setYear] = useState<any>([]);
  const [time, setTime] = useState<object>({});
  const month = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    let a = 2021;
    const arr: any = [];
    for (let i = 2200; i > a; a++) {
      arr.push(a);
    }
    setYear(arr);
  }, []);

  const days = useMemo(
    () => new Array(currentMonth.daysInMonth()).fill(0),
    [currentMonth],
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDate(dayjs().format('YYYY-MM-DD'));
      setText('');
    });
    return unsubscribe;
  }, [navigation]);

  const handleScroll = (e: any, str: string) => {
    const index = Math.floor(e.nativeEvent.contentOffset.y / 40);
    if (str === 'month') {
      setTime({
        ...time,
        month: month[index],
      });
    }
    if (str === 'year') {
      setTime({
        ...time,
        year: year[index],
      });
    }
    if (str === 'day') {
      setTime({
        ...time,
        day: index + 1,
      });
    }
  };

  const handleScrollEnd = (e: any, str: string) => {
    const index = Math.floor(e.nativeEvent.contentOffset.y / 40);
    if (str === 'month') {
      changeDay(month[index]);
      setTime({
        ...time,
        month: month[index],
      });
    }
    if (str === 'year') {
      setTime({
        ...time,
        year: year[index],
      });
      changeDay(time?.month ? time?.month : Number(dayjs().format('M')));
    }
    if (str === 'day') {
      setTime({
        ...time,
        day: index + 1,
      });
      changeDay(time?.month ? time?.month : Number(dayjs().format('M')));
    }
  };

  const changeDay = (month: number) => {
    if (!time?.day || time?.day == undefined) return;
    let month31 = [1, 3, 5, 7, 8, 10, 12];
    let month30 = [4, 5, 9, 11];
    if (month31.indexOf(month) > -1) return;
    if (month30.indexOf(month) > -1) {
      if (time?.day === 31) {
        scrollerRefDay.current.scrollTo({
          y: 29 * 40,
        });
      }
    }
    if (month === 2) {
      if (time?.year && time?.year % 4 === 0) {
        if (time?.day < 29) return;
        scrollerRefDay.current.scrollTo({
          y: 28 * 40,
        });
      } else {
        if (time?.day < 28) return;
        scrollerRefDay.current.scrollTo({
          y: 27 * 40,
        });
      }
    }
  };

  const confirm = () => {
    setDate(
      `${time?.year ? time?.year : dayjs().format('YYYY')}-${
        time?.month ? time?.month : 1
      }-${time?.day ? time?.day : 1}`,
    );
    setVisiable(false);
    setTime({});
  };

  let judge = route?.params?.title === '技能专项提升';
  return (
    <>
      <SlideupMenu
        show={visiable}
        showClosePosition={false}
        title=""
        onClose={() => {
          setVisiable(false);
          setTime({});
        }}
      >
        <View style={styles.pickerBody}>
          <View
            style={{
              height: 60,
              borderBottomColor: '#ECECEC',
              borderBottomWidth: 1,
              width: '100%',
              position: 'absolute',
              zIndex: 9,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              style={{
                height: '100%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: 80,
              }}
              onPress={() => {
                setVisiable(false);
                setTime({});
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#999999',
                }}
              >
                取消
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: '100%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: 80,
              }}
              onPress={confirm}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#0B56F8',
                }}
              >
                确认
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            style={{
              position: 'absolute',
              top: 61,
              width: '100%',
              height: 60,
              zIndex: 999,
            }}
            source={require('./assets/gradualWhite.png')}
          />
          <Image
            style={{
              position: 'absolute',
              top: 183,
              width: '100%',
              height: 60,
              zIndex: 999,
              transform: [{rotateX:'180deg'}],
            }}
            source={require('./assets/gradualWhite.png')}
          />
          <View
            style={{
              position: 'absolute',
              height: 42,
              borderTopColor: '#ECECEC',
              borderTopWidth: 1,
              borderBottomColor: '#ECECEC',
              borderBottomWidth: 1,
              width: '100%',
              top: 130,
            }}
          ></View>
          {/* year */}
          <ScrollView
            ref={scrollerRef}
            style={{
              height: 240,
              flex: 1,
            }}
            snapToInterval={40}
            snapToAlignment="start"
            disableIntervalMomentum={Platform.OS === 'android'}
            scrollEventThrottle={10}
            onScroll={(e) => handleScroll(e, 'year')}
            onMomentumScrollEnd={(e) => handleScrollEnd(e, 'year')}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ paddingVertical: 70, marginTop: 60 }}>
              {year.map((v, i) => (
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={i}
                >
                  <Text>{`${v}年`}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          {/* month */}
          <ScrollView
            ref={scrollerRef}
            style={{
              height: 240,
              flex: 1,
            }}
            snapToInterval={40}
            snapToAlignment="start"
            disableIntervalMomentum={Platform.OS === 'android'}
            scrollEventThrottle={10}
            onScroll={(e) => handleScroll(e, 'month')}
            onMomentumScrollEnd={(e) => handleScrollEnd(e, 'month')}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ paddingVertical: 70, marginTop: 60 }}>
              {month.map((v, i) => (
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={i}
                >
                  <Text>{`${v}月`}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          {/* day */}
          <ScrollView
            ref={scrollerRefDay}
            style={{
              height: 240,
              flex: 1,
            }}
            snapToInterval={40}
            snapToAlignment="start"
            disableIntervalMomentum={Platform.OS === 'android'}
            scrollEventThrottle={10}
            onScroll={(e) => handleScroll(e, 'day')}
            onMomentumScrollEnd={(e) => handleScrollEnd(e, 'day')}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ paddingVertical: 70, marginTop: 60 }}>
              {days.map((v, i) => (
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={i}
                >
                  <Text>{`${i + 1}日`}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SlideupMenu>
    </>
  );
}

```

## 蒙层组件
```js

const styles = StyleSheet.create({
  sheet: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
  },
  closeLeft: {
    position: 'absolute',
    left: 15,
    top: 13,
  },
  closeRight: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  closeIcon: {
    height: 20,
    width: 20,
  },
});

interface IProps {
  show: boolean;
  title: string;
  onClose: () => void;
  closePosition?: 'left' | 'right';
  children?: any;
  showClosePosition?: boolean; //是否显示关闭符号
}

export default function SlideupMenu({
  show,
  title,
  onClose,
  children,
  closePosition = 'left',
  showClosePosition = true,
}: IProps) {
  const slideAnimate = useRef(new Animated.Value(1000)).current;
  const [visible, setVisible] = useState(false);

  const slideIn = () => {
    Animated.timing(slideAnimate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnimate, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setVisible(false);
      }
    });
  };

  useEffect(() => {
    if (show) {
      setVisible(true);
      slideIn();
    } else {
      slideOut();
    }
  }, [show]);

  const handleClose = () => {
    onClose && onClose();
  };
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View
            style={{
              flexGrow: 1,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: slideAnimate }] }]}
        >
          {showClosePosition && (
            <View style={styles.header}>
              {closePosition === 'left' && (
                <TouchableOpacity
                  style={styles.closeLeft}
                  onPress={handleClose}
                >
                  <Image
                    source={require('../assets/close-icon.png')}
                    style={styles.closeIcon}
                  ></Image>
                </TouchableOpacity>
              )}
              <Text>{title}</Text>
              {closePosition === 'right' && (
                <TouchableOpacity
                  style={styles.closeRight}
                  onPress={handleClose}
                >
                  <Image
                    source={require('../assets/close-icon.png')}
                    style={styles.closeIcon}
                  ></Image>
                </TouchableOpacity>
              )}
            </View>
          )}
          {children && React.Children.only(children)}
        </Animated.View>
      </View>
    </Modal>
  );
}

```

