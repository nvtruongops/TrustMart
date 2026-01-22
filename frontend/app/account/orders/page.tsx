'use client';

import { useState } from 'react';
import { mockPurchases, mockSales, getOrderStatusBadge, formatCurrency, formatDate, type Order } from '@/lib/mockUserData';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'purchases' | 'sales'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const allOrders = [...mockPurchases, ...mockSales].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const getFilteredOrders = (): Order[] => {
    let orders: Order[] = [];
    
    if (activeTab === 'all') {
      orders = allOrders;
    } else if (activeTab === 'purchases') {
      orders = mockPurchases;
    } else {
      orders = mockSales;
    }

    if (filterStatus !== 'all') {
      orders = orders.filter(order => order.status === filterStatus);
    }

    return orders;
  };

  const filteredOrders = getFilteredOrders();

  const stats = {
    all: allOrders.length,
    purchases: mockPurchases.length,
    sales: mockSales.length,
    pending: allOrders.filter(o => ['pending_payment', 'paid', 'in_escrow'].includes(o.status)).length,
    inTransit: allOrders.filter(o => o.status === 'in_transit').length,
    completed: allOrders.filter(o => o.status === 'completed').length,
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h1>
              <p className="text-sm text-gray-600 mt-1">Quản lý đơn mua và đơn bán</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Tất cả</p>
            <p className="text-2xl font-bold text-gray-900">{stats.all}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Đã mua</p>
            <p className="text-2xl font-bold text-blue-600">{stats.purchases}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Đã bán</p>
            <p className="text-2xl font-bold text-green-600">{stats.sales}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Chờ xử lý</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Đang giao</p>
            <p className="text-2xl font-bold text-purple-600">{stats.inTransit}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Hoàn thành</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'all'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Tất cả đơn hàng
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'purchases'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Đơn mua
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'sales'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Đơn bán
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Lọc theo trạng thái:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="pending_payment">Chờ thanh toán</option>
                <option value="in_escrow">Đang giữ tiền</option>
                <option value="in_transit">Đang giao hàng</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
                <option value="disputed">Tranh chấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có đơn hàng</h3>
              <p className="text-gray-600">Chưa có đơn hàng nào phù hợp với bộ lọc</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusBadge = getOrderStatusBadge(order.status);
              const isBuyer = !!order.seller_name;

              return (
                <div key={order.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Mã đơn:</span>
                        <span className="text-sm font-mono font-semibold text-gray-900">{order.id}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                        {order.transaction_type === 'reviewer_verified' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Đã kiểm định
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">{formatDate(order.created_at)}</span>
                    </div>

                    {/* Order Content */}
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={order.product_image}
                          alt={order.product_name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {order.product_name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600">
                            {isBuyer ? 'Người bán:' : 'Người mua:'}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {isBuyer ? order.seller_name : order.buyer_name}
                          </span>
                        </div>
                        <p className="text-xl font-bold text-purple-600">
                          {formatCurrency(order.price)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        {order.status === 'delivered' && isBuyer && (
                          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                            Xác nhận nhận hàng
                          </button>
                        )}
                        {order.status === 'completed' && (
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                            Mua lại
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                          Xem chi tiết
                        </button>
                        {['delivered', 'completed'].includes(order.status) && (
                          <button className="px-4 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors">
                            Tranh chấp
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
