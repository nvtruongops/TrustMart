'use client';

import { useState } from 'react';
import { mockDisputes } from '@/lib/mockAdminData';

export default function DisputesPage() {
  const [disputes] = useState(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);
  const [businessKey, setBusinessKey] = useState('');
  const [reason, setReason] = useState('');
  const [showBusinessKeyModal, setShowBusinessKeyModal] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleResolveDispute = (disputeId: string, productValue: number) => {
    setSelectedDispute(disputeId);
    if (productValue >= 5000000) {
      setShowBusinessKeyModal(true);
    } else {
      // Xử lý trực tiếp không cần Business Key
      alert(`Xử lý dispute ${disputeId} (không cần Business Key)`);
    }
  };

  const submitResolution = () => {
    if (!businessKey || !reason || reason.length < 20) {
      alert('Vui lòng nhập Business Key và lý do (tối thiểu 20 ký tự)');
      return;
    }
    alert(`Đã xử lý dispute ${selectedDispute} với Business Key`);
    setShowBusinessKeyModal(false);
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý Tranh chấp</h1>
              <p className="text-sm text-gray-600 mt-1">Xử lý và giải quyết tranh chấp</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại tranh chấp
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Tất cả</option>
                <option value="type_a">Type A (AI-Only)</option>
                <option value="type_b1">Type B1 (Immediate)</option>
                <option value="type_b2">Type B2 (Warranty)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Tất cả</option>
                <option value="pending">Chờ xử lý</option>
                <option value="under_review">Đang xem xét</option>
                <option value="resolved">Đã giải quyết</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ưu tiên
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Tất cả</option>
                <option value="high">Cao</option>
                <option value="medium">Trung bình</option>
                <option value="low">Thấp</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá trị tối thiểu
              </label>
              <input
                type="number"
                placeholder="VND"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <div key={dispute.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {dispute.product_name}
                      </h3>
                      {dispute.dispute_type === 'type_a' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Type A
                        </span>
                      )}
                      {dispute.dispute_type === 'type_b1' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Type B1
                        </span>
                      )}
                      {dispute.dispute_type === 'type_b2' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Type B2
                        </span>
                      )}
                      {dispute.priority >= 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Ưu tiên cao
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{dispute.reason}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Mã đơn:</span>
                        <p className="font-medium text-gray-900">{dispute.order_id}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Buyer:</span>
                        <p className="font-medium text-gray-900">{dispute.buyer_name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Seller:</span>
                        <p className="font-medium text-gray-900">{dispute.seller_name}</p>
                      </div>
                      {dispute.reviewer_name && (
                        <div>
                          <span className="text-gray-500">Reviewer:</span>
                          <p className="font-medium text-gray-900">{dispute.reviewer_name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(dispute.product_value)}
                    </p>
                    {dispute.product_value >= 5000000 && (
                      <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Yêu cầu Business Key
                      </p>
                    )}
                  </div>
                </div>

                {/* AI Analysis */}
                {dispute.ai_similarity_score !== undefined && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Phân tích AI</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Similarity Score:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                dispute.ai_similarity_score < 70 ? 'bg-red-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${dispute.ai_similarity_score}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold ${
                            dispute.ai_similarity_score < 70 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {dispute.ai_similarity_score}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Đề xuất AI:</span>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {dispute.ai_recommendation === 'approve_buyer' && '✓ Hoàn tiền cho Buyer'}
                          {dispute.ai_recommendation === 'approve_seller' && '✓ Có lợi cho Seller'}
                          {dispute.ai_recommendation === 'manual_review' && '⚠️ Cần xem xét thủ công'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleResolveDispute(dispute.id, dispute.product_value)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    ✓ Có lợi cho Buyer
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                    ✗ Có lợi cho Seller
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                    ⚖️ Hoàn tiền một phần
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                    📄 Xem chi tiết
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    💬 Yêu cầu bằng chứng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Business Key Modal */}
      {showBusinessKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Yêu cầu Business Key</h3>
                  <p className="text-sm text-gray-600">Dispute có giá trị ≥ 5 triệu VND</p>
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
                    Lý do xử lý <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Nhập lý do xử lý (tối thiểu 20 ký tự)"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {reason.length}/20 ký tự tối thiểu
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    ⚠️ Hành động này sẽ được ghi vào Audit Logs và không thể hoàn tác.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowBusinessKeyModal(false);
                    setBusinessKey('');
                    setReason('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={submitResolution}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
