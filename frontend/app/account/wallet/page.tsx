'use client';

import { useState } from 'react';
import { mockUserStats, mockTransactions, getTransactionTypeBadge, formatCurrency, formatDate, type Transaction } from '@/lib/mockUserData';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');
  const [filterType, setFilterType] = useState<string>('all');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const filteredTransactions = filterType === 'all'
    ? mockTransactions
    : mockTransactions.filter(txn => txn.type === filterType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <a href="/account" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ví của tôi</h1>
              <p className="text-sm text-gray-600 mt-1">Quản lý số dư và giao dịch</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm opacity-90">Số dư khả dụng</span>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-4">{formatCurrency(mockUserStats.wallet_balance)}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDepositModal(true)}
                className="flex-1 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Nạp tiền
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400 transition-colors text-sm font-medium"
              >
                Rút tiền
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Đang giữ (Escrow)</span>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(mockUserStats.escrow_balance)}
            </p>
            <p className="text-xs text-gray-500">
              Tiền đang được giữ cho các giao dịch
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Chờ thanh toán</span>
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(mockUserStats.pending_balance)}
            </p>
            <p className="text-xs text-gray-500">
              Tiền từ đơn bán chưa hoàn tất
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Tổng quan
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'transactions'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Lịch sử giao dịch
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê tài chính</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tổng nạp</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(mockTransactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0))}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tổng rút</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(Math.abs(mockTransactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0)))}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tổng mua</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(Math.abs(mockTransactions.filter(t => t.type === 'purchase').reduce((sum, t) => sum + t.amount, 0)))}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tổng bán</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(mockTransactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0))}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Lưu ý về Escrow</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Tiền mua hàng sẽ được giữ trong Escrow cho đến khi bạn xác nhận nhận hàng</li>
                  <li>• Tiền bán hàng sẽ được giữ trong Escrow cho đến khi hết thời gian tranh chấp (7 ngày)</li>
                  <li>• Bạn có thể tranh chấp trong thời gian bảo hành nếu phát hiện vấn đề</li>
                </ul>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="p-6">
              {/* Filter */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Lọc theo loại:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">Tất cả</option>
                  <option value="deposit">Nạp tiền</option>
                  <option value="withdrawal">Rút tiền</option>
                  <option value="purchase">Mua hàng</option>
                  <option value="sale">Bán hàng</option>
                  <option value="refund">Hoàn tiền</option>
                  <option value="fee">Phí</option>
                </select>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.map((txn) => {
                  const badge = getTransactionTypeBadge(txn.type);
                  const isPositive = txn.amount > 0;

                  return (
                    <div key={txn.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          isPositive ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {badge.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{txn.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs font-medium ${badge.color}`}>
                              {badge.label}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(txn.created_at)}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                              txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {txn.status === 'completed' ? 'Hoàn thành' :
                               txn.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {isPositive ? '+' : ''}{formatCurrency(txn.amount)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nạp tiền vào ví</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền</label>
                <input
                  type="number"
                  placeholder="Nhập số tiền"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phương thức</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3">
                  <option>Chuyển khoản ngân hàng</option>
                  <option>Ví điện tử</option>
                  <option>Thẻ tín dụng</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Rút tiền về tài khoản</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền</label>
                <input
                  type="number"
                  placeholder="Nhập số tiền"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Số dư khả dụng: {formatCurrency(mockUserStats.wallet_balance)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tài khoản ngân hàng</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3">
                  <option>Vietcombank - **** 1234</option>
                  <option>Thêm tài khoản mới</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
