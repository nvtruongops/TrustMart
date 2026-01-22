'use client';

import { useState } from 'react';
import { mockCurrentUser, mockUserAddresses, getTrustScoreLevel } from '@/lib/mockUserData';

export default function ProfilePage() {
  const [user, setUser] = useState(mockCurrentUser);
  const [addresses, setAddresses] = useState(mockUserAddresses);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const trustLevel = getTrustScoreLevel(user.trust_score);

  const handleSaveProfile = () => {
    // TODO: Call API to save profile
    setIsEditing(false);
    alert('Đã lưu thông tin cá nhân');
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        is_default: addr.id === addressId,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/account"
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
              <p className="text-sm text-gray-600 mt-1">Quản lý thông tin tài khoản của bạn</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-3 py-1 text-sm text-white bg-purple-600 rounded hover:bg-purple-700"
                    >
                      Lưu
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.full_name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold">
                        {user.full_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <button className="px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded hover:bg-purple-50">
                        Thay đổi ảnh đại diện
                      </button>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{user.full_name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Thành viên từ {new Date(user.created_at).toLocaleDateString('vi-VN')}</p>
                        <div className="flex gap-2 mt-2">
                          {user.roles.map((role) => (
                            <span
                              key={role}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {role === 'buyer' ? 'Người mua' : 'Người bán'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={user.full_name}
                        onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{user.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900">{user.email}</p>
                      {user.email_verified && (
                        <span className="inline-flex items-center text-xs text-green-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Đã xác thực
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <input
                          type="tel"
                          value={user.phone_number}
                          onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{user.phone_number}</p>
                      )}
                      {user.phone_verified && (
                        <span className="inline-flex items-center text-xs text-green-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Đã xác thực
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses Card */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Địa chỉ</h2>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  + Thêm địa chỉ
                </button>
              </div>
              <div className="p-6 space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 ${
                      address.is_default ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {address.address_type === 'home' && '🏠 Nhà riêng'}
                            {address.address_type === 'work' && '🏢 Văn phòng'}
                            {address.address_type === 'other' && '📍 Khác'}
                          </span>
                          {address.is_default && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-900 mb-1">{address.full_address}</p>
                        <p className="text-xs text-gray-500">
                          {address.ward}, {address.district}, {address.city}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!address.is_default && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-xs text-purple-600 hover:text-purple-700"
                          >
                            Đặt mặc định
                          </button>
                        )}
                        <button className="text-xs text-gray-600 hover:text-gray-700">
                          Sửa
                        </button>
                        <button className="text-xs text-red-600 hover:text-red-700">
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Bảo mật</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mật khẩu</p>
                    <p className="text-xs text-gray-500">Đổi mật khẩu định kỳ để bảo mật tài khoản</p>
                  </div>
                  <button className="px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded hover:bg-purple-50">
                    Đổi mật khẩu
                  </button>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Xác thực hai yếu tố (2FA)</p>
                    <p className="text-xs text-gray-500">Tăng cường bảo mật cho tài khoản</p>
                  </div>
                  <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                    Bật 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trust Score & Stats */}
          <div className="space-y-6">
            {/* Trust Score Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Điểm tin cậy</h2>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(user.trust_score / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold text-gray-900">{user.trust_score}</p>
                    <p className="text-xs text-gray-500">/ 100</p>
                  </div>
                </div>
                <p className={`text-lg font-semibold mt-4 ${trustLevel.color}`}>
                  {trustLevel.label}
                </p>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Tiếp tục giao dịch trung thực để tăng điểm tin cậy
                </p>
              </div>

              {user.fraud_strikes > 0 && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ Cảnh báo: {user.fraud_strikes} lần vi phạm
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Tài khoản sẽ bị khóa sau 3 lần vi phạm
                  </p>
                </div>
              )}
            </div>

            {/* Account Status Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái tài khoản</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trạng thái</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className={`text-xs ${user.email_verified ? 'text-green-600' : 'text-red-600'}`}>
                    {user.email_verified ? '✓ Đã xác thực' : '✗ Chưa xác thực'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Số điện thoại</span>
                  <span className={`text-xs ${user.phone_verified ? 'text-green-600' : 'text-red-600'}`}>
                    {user.phone_verified ? '✓ Đã xác thực' : '✗ Chưa xác thực'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Đăng nhập lần cuối</span>
                  <span className="text-xs text-gray-900">
                    {new Date(user.last_login_at).toLocaleString('vi-VN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-lg shadow p-6 border-2 border-red-200">
              <h2 className="text-lg font-semibold text-red-600 mb-4">Vùng nguy hiểm</h2>
              <button className="w-full px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50">
                Xóa tài khoản
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Hành động này không thể hoàn tác
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thêm địa chỉ mới</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại địa chỉ
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="home">Nhà riêng</option>
                    <option value="work">Văn phòng</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ đầy đủ
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Số nhà, tên đường..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quận/Huyện
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowAddressModal(false);
                    alert('Đã thêm địa chỉ mới');
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
