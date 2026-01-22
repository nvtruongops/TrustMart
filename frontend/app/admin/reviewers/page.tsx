'use client';

import { useState } from 'react';
import { mockReviewerApplications } from '@/lib/mockAdminData';

export default function ReviewersPage() {
  const [applications] = useState(mockReviewerApplications);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [businessKey, setBusinessKey] = useState('');
  const [reason, setReason] = useState('');
  const [action, setAction] = useState<'approve' | 'reject'>('approve');

  const handleApproveReject = (appId: string, actionType: 'approve' | 'reject') => {
    setSelectedApp(appId);
    setAction(actionType);
    setShowApprovalModal(true);
  };

  const submitDecision = () => {
    if (!businessKey || !reason) {
      alert('Vui lòng nhập Business Key và lý do');
      return;
    }
    alert(`Đã ${action === 'approve' ? 'duyệt' : 'từ chối'} đơn ${selectedApp}`);
    setShowApprovalModal(false);
    setBusinessKey('');
    setReason('');
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý Reviewer</h1>
              <p className="text-sm text-gray-600 mt-1">Duyệt và quản lý chuyên gia kiểm định</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="px-6 py-4 text-sm font-medium text-purple-600 border-b-2 border-purple-600">
                Đang chờ duyệt ({applications.filter(a => a.status === 'pending_approval').length})
              </button>
              <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Đã duyệt ({applications.filter(a => a.status === 'approved').length})
              </button>
              <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Đã từ chối ({applications.filter(a => a.status === 'rejected').length})
              </button>
            </nav>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications
            .filter(app => app.status === 'pending_approval')
            .map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-xl">
                        {app.user_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {app.user_name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{app.email}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Kinh nghiệm:</span>
                            <p className="text-sm font-medium text-gray-900">
                              {app.experience_years} năm
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Ngày đăng ký:</span>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(app.created_at).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="text-sm text-gray-500 block mb-2">Chuyên môn:</span>
                          <div className="flex flex-wrap gap-2">
                            {app.categories.map((cat) => (
                              <span
                                key={cat}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm text-gray-500 block mb-2">Chứng chỉ:</span>
                          <div className="space-y-1">
                            {app.certifications.map((cert, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {cert}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Chờ duyệt
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleApproveReject(app.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Duyệt đơn
                    </button>
                    <button
                      onClick={() => handleApproveReject(app.id, 'reject')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Từ chối
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                      📄 Xem chi tiết
                    </button>
                  </div>

                  <div className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-xs text-orange-800 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Yêu cầu Business Key để duyệt/từ chối đơn
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {applications.filter(a => a.status === 'pending_approval').length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không có đơn đăng ký nào
            </h3>
            <p className="text-gray-600">
              Hiện tại không có đơn đăng ký Reviewer nào đang chờ duyệt
            </p>
          </div>
        )}
      </main>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  action === 'approve' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {action === 'approve' ? (
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {action === 'approve' ? 'Duyệt đơn Reviewer' : 'Từ chối đơn Reviewer'}
                  </h3>
                  <p className="text-sm text-gray-600">Yêu cầu Business Key</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={businessKey}
                    onChange={(e) => setBusinessKey(e.target.value)}
                    placeholder="Nhập Business Key của ca trực"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lý do <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={
                      action === 'approve'
                        ? 'VD: Đủ bằng cấp và kinh nghiệm cho category Electronics'
                        : 'VD: Không đủ bằng cấp chuyên môn'
                    }
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    ⚠️ Hành động này sẽ được ghi vào Audit Logs
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowApprovalModal(false);
                    setBusinessKey('');
                    setReason('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={submitDecision}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    action === 'approve'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
