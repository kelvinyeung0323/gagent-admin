export const OrderState = Object.freeze({
  SENDED: { code: 'SENDED', msg: '快递已发出' },
  ORDERED4SEND: { code: 'ORDERED4SEND', msg: '已下单待发出' },
  BILLING: { code: 'BILLING', msg: '正在出单进号' },
  WAIT4SEND: { code: 'WAIT4SEND', msg: '等待发出' },
  WAIT4BILL: { code: 'WAIT4BILL', msg: '等待出单号' },
  ERROR: { code: 'ERROR', msg: '有错误的订单' }
})

export const OrderType = Object.freeze({
  EXPRESS: { code: 'EXPRESS', msg: '普通快递' },
  MAIL: { code: 'MAIL', msg: '寄信封件' },
  GIFT: { code: 'GIFT', msg: '礼品代发' },
})

export const PayType = Object.freeze({
  WXPAY: { code: 'WXPAY', msg: '微信支付' },
  ALIPAY: { code: 'ALIPAY', msg: '支付宝' }
})

export const Platform = Object.freeze({
  TAOBAO: { code: 'TAOBAO', msg: '淘宝/天猫' },
  PIN: { code: 'PID', msg: '拼多多' },
  JD: { code: 'JD', msg: '京东' },
  ALI: { code: 'ALI', msg: '阿里巴巴' },
  ORTHER:{ code: 'ORTHER', msg: '其他' }

})

export const TradeType = Object.freeze({
    CHARGE: { code: 'CHARGE', msg: '充值' },
    OPTIMIZE: { code: 'OPTIMIZE', msg: '店铺优化' },
    BILL: { code: 'BILL', msg: '快递单号' },
    COMMISSION_IN: { code: 'COMMISSION_IN', msg: '推广佣金' },
    COMMISSINO_OUT: { code: 'COMMISSION_OUT', msg: '佣金转出' },
    CASH: { code: 'CASH', msg: '提现'},
  }
)

export const VipLvl = Object.freeze({
  VIP1:{code:'VIP1',msg:'vip1'},
  VIP2:{code:'VIP2',msg:'vip2'},
  VIP3:{code:'VIP3',msg:'vip3'},
  VIP4:{code:'VIP4',msg:'vip4'},
  VIP5:{code:'VIP5',msg:'vip5'}
});

export default {OrderState,OrderType,PayType,Platform,TradeType,VipLvl}


