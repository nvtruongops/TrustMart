'use client';

import { useState } from 'react';
import { mockAuditLogs } from '@/lib/mockAdminData';

export default function AuditLogsPage() {
  const [logs] = useState(mockAuditLogs);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const getActionBadge = (actionType: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      resolve_dispute: { label: 'Giải quyết tranh chấp', color: 'bg-blue-100 text-blue-800' },
      approve_reviewer: { label: 'Duyệt Reviewer', color: 'bg-green-100 text-green-800' },
      reject_reviewer: { label: 'Từ chối Reviewer', color: 'bg-red-100 text-red-800' },
      transfer_fund: { label: 'Chuyển tiền', color: 'bg-purple-100 text-purple-800' },
      lock_user: { label: 'Khóa User', color: 'bg-orange-100 text-orange-800' },
      unlock_user: { label: 'Mở khóa User', color: 'bg-green-100 text-green-800' },
      config_change: { label: 'Thay đổi cấu hình', color: 'bg-yellow-100 text-yellow-800' },
    };
    return badges[actionType] || { label: actionType, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
              <p className="text-sm text-gray-600 mt-1">Nhật ký kiểm toán hệ thống (Immutable)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Về Audit Logs
              </h3>
              <p className="text-sm text-blue-800">
                Audit Logs ghi lại mọi hành động nhạy cảm của Admin. Logs này <strong>không thể xóa hoặc chỉnh sửa</strong> (immutable) 
                để đảm bảo tính minh bạch và trách nhiệm giải trình. Chỉ Super Admin được xem đầy đủ tất cả logs.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Tất cả</option>
                <option value="admin-001">Nguyễn Văn Admin</option>
                <option value="admin-002">Lê Văn Finance</option>
                <option value="admin-003">Trần Thị CS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại hành động
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Tất cả</option>
                <option value="resolve_dispute">Giải quyết tranh chấp</option>
                <option value="approve_reviewer">Duyệt Reviewer</option>
                <option value="transfer_fund">Chuyển tiền</option>
                <option value="lock_user">Khóa User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
              Áp dụng bộ lọc
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
              Đặt lại
            </button>
            <button className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Logs Timeline */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Nhật ký hoạt động ({logs.length})
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {logs.map((log, index) => {
                const actionBadge = getActionBadge(log.action_type);
                const isExpanded = selectedLog === log.id;

                return (
                  <div key={log.id} className="relative">
                    {/* Timeline line */}
                    {index !== logs.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                    )}

                    <div className="flex gap-4">
                      {/* Timeline dot */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow">
                          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>

                      {/* Log content */}
                      <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionBadge.color}`}>
                                {actionBadge.label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(log.created_at).toLocaleString('vi-VN')}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {log.admin_name}
                            </p>
                            <p className="text-sm text-gray-700">
                              {log.reason}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedLog(isExpanded ? null : log.id)}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            {isExpanded ? 'Thu gọn' : 'Chi tiết'}
                          </button>
                        </div>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Target Type:</span>
                                <p className="font-medium text-gray-900">{log.target_type}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Target ID:</span>
                                <p className="font-medium text-gray-900 font-mono text-xs">
                                  {log.target_id}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">IP Address:</span>
                                <p className="font-medium text-gray-900">{log.ip_address}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Log ID:</span>
                                <p className="font-medium text-gray-900 font-mono text-xs">
                                  {log.id}
                                </p>
                              </div>
                            </div>

                            <div className="bg-white rounded border border-gray-200 p-3">
                              <p className="text-xs text-gray-500 mb-1">Business Key Hash:</p>
                              <p className="font-mono text-xs text-gray-900 break-all">
                                SHA-256: a3f8b9c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0
                              </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Log này không thể xóa hoặc chỉnh sửa (Immutable)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-yellow-900 mb-1">
                Cảnh báo bảo mật
              </h3>
              <p className="text-sm text-yellow-800">
                Mọi hành động nhạy cảm đều được ghi lại. Hệ thống sẽ cảnh báo Super Admin nếu phát hiện:
                Admin thực hiện > 10 hành động/giờ, truy cập từ IP lạ, hoặc cố gắng thực hiện hành động ngoài quyền hạn.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
