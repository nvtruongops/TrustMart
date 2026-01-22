'use client';

import { useState } from 'react';
import { mockPlatformStats, mockDisputes, mockCurrentAdmin } from '@/lib/mockAdminData';

export default function AdminDashboard() {
  const [stats] = useState(mockPlatformStats);
  const [disputes] = useState(mockDisputes);
  const [admin] = useState(mockCurrentAdmin);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getDisputeTypeBadge = (type: string) => {
    const badges = {
      type_a: { label: 'Type A (AI-Only)', color: 'bg-blue-100 text-blue-800' },
      type_b1: { label: 'Type B1 (Immediate)', color: 'bg-orange-100 text-orange-800' },
      type_b2: { label: 'Type B2 (Warranty)', color: 'bg-purple-100 text-purple-800' },
    };
    return badges[type as keyof typeof badges] || badges.type_a;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
      under_review: { label: 'Đang xem xét', color: 'bg-blue-100 text-blue-800' },
      resolved: { label: 'Đã giải quyết', color: 'bg-green-100 text-green-800' },
      closed: { label: 'Đã đóng', color: 'bg-gray-100 text-gray-800' },
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getPriorityBadge = (priority: number) => {
    if (priority >= 3) return { label: 'Cao', color: 'bg-red-100 text-red-800' };
    if (priority === 2) return { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Thấp', color: 'bg-green-100 text-green-800' };
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      super_admin: { label: 'Super Admin', color: 'bg-purple-100 text-purple-800' },
      finance_admin: { label: 'Finance Admin', color: 'bg-green-100 text-green-800' },
      cs: { label: 'Customer Service', color: 'bg-blue-100 text-blue-800' },
      tech_support: { label: 'Tech Support', color: 'bg-gray-100 text-gray-800' },
    };
    return badges[role as keyof typeof badges] || badges.cs;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Quản lý nền tảng TrustMart</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{admin.full_name}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(admin.role).color}`}>
                  {getRoleBadge(admin.role).label}
                </span>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {admin.full_name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(stats.total_revenue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reserve Fund</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(stats.reserve_fund_balance)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.reserve_fund_balance < 10000000 ? '⚠️ Dưới ngưỡng' : '✓ Khỏe mạnh'}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tranh chấp chờ</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pending_disputes}</p>
                <p className="text-xs text-gray-500 mt-1">Tỷ lệ: {stats.dispute_rate}%</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reviewer hoạt động</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active_reviewers}</p>
                <p className="text-xs text-gray-500 mt-1">Users online: {stats.users_online}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/disputes" className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Xử lý Dispute</span>
            </a>
            <a href="/admin/reviewers" className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Duyệt Reviewer</span>
            </a>
            <a href="/admin/finance" className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Báo cáo Tài chính</span>
            </a>
            <a href="/admin/shifts" className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <svg className="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Quản lý Ca trực</span>
            </a>
          </div>
        </div>

        {/* Disputes Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tranh chấp đang chờ xử lý</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá trị
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ưu tiên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {disputes.map((dispute) => {
                  const typeBadge = getDisputeTypeBadge(dispute.dispute_type);
                  const statusBadge = getStatusBadge(dispute.status);
                  const priorityBadge = getPriorityBadge(dispute.priority);

                  return (
                    <tr key={dispute.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dispute.order_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{dispute.product_name}</div>
                        <div className="text-xs text-gray-500">
                          Buyer: {dispute.buyer_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeBadge.color}`}>
                          {typeBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(dispute.product_value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityBadge.color}`}>
                          {priorityBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dispute.ai_similarity_score ? (
                          <span className={dispute.ai_similarity_score < 70 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                            {dispute.ai_similarity_score}%
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 mr-3">
                          Xem chi tiết
                        </button>
                        {dispute.product_value >= 5000000 && (
                          <span className="text-xs text-orange-600">🔑 Cần BK</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
