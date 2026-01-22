'use client';

import { useState } from 'react';
import { mockCategories, mockAIAssessment, mockReceiptOCR, getTrustTierInfo, calculateListingFee, formatCurrency } from '@/lib/mockSellerData';

export default function SellNewPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    images: [] as string[],
    receiptImages: [] as string[],
    attributes: {} as Record<string, any>,
    requiresDeposit: false,
    depositPercentage: 10,
  });
  const [aiAssessment, setAiAssessment] = useState<typeof mockAIAssessment | null>(null);
  const [receiptOCR, setReceiptOCR] = useState<typeof mockReceiptOCR | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const category = mockCategories.find(c => c.id === selectedCategory);
  const trustScore = aiAssessment?.trust_score_estimate || 0;
  const listingFee = calculateListingFee(Number(productData.price) || 0, trustScore);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate upload
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setProductData({ ...productData, images: [...productData.images, ...newImages] });
      
      // Simulate AI analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setAiAssessment(mockAIAssessment);
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setProductData({ ...productData, receiptImages: [...productData.receiptImages, ...newImages] });
      
      // Simulate OCR
      setIsAnalyzing(true);
      setTimeout(() => {
        setReceiptOCR(mockReceiptOCR);
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  const handlePublish = () => {
    // Validation
    if (!productData.title || !productData.description || !productData.price) {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }

    if (trustScore < 60) {
      if (confirm(`Trust Score thấp (${trustScore}). Bạn sẽ phải trả phí đăng bán ${formatCurrency(listingFee)}. Tiếp tục?`)) {
        alert('Đã đăng bán sản phẩm! Chuyển đến trang thanh toán phí...');
        // Redirect to /sell after publish
        window.location.href = '/sell';
      }
    } else {
      alert('Đã đăng bán sản phẩm miễn phí!');
      // Redirect to /sell after publish
      window.location.href = '/sell';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <a href="/sell" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Đăng bán sản phẩm</h1>
              <p className="text-sm text-gray-600 mt-1">AI sẽ hỗ trợ bạn đăng bán nhanh chóng</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 4 && (
                  <div className={`w-24 h-1 ${step > s ? 'bg-purple-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <span className="w-32 text-center">Chọn danh mục</span>
            <span className="w-32 text-center">Upload ảnh</span>
            <span className="w-32 text-center">Thông tin</span>
            <span className="w-32 text-center">Xác nhận</span>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Chọn danh mục sản phẩm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockCategories.map((cat) => {
                const tier = getTrustTierInfo(cat.trust_tier);
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setStep(2);
                    }}
                    className={`p-6 border-2 rounded-lg text-left hover:border-purple-500 hover:bg-purple-50 transition-colors ${
                      selectedCategory === cat.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cat.name}</h3>
                    <p className={`text-xs font-medium mb-2 ${tier.color}`}>{tier.label}</p>
                    <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                    <div className="text-xs text-gray-500">
                      <p>• Tối thiểu {cat.min_images} ảnh</p>
                      <p>• {cat.requires_reviewer ? '✓ Có Reviewer' : '✗ Không Reviewer'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Image Upload */}
        {step === 2 && category && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload ảnh sản phẩm</h2>
              
              {/* Required Images Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Yêu cầu ảnh cho {category.name}:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  {category.required_images.map((img, idx) => (
                    <li key={idx}>• {img}</li>
                  ))}
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                  Tối thiểu {category.min_images} ảnh, khuyến nghị {category.recommended_images} ảnh
                </p>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 mb-2">Kéo thả ảnh vào đây hoặc click để chọn</p>
                  <p className="text-sm text-gray-500">PNG, JPG, HEIC (tối đa 10MB mỗi ảnh)</p>
                </label>
              </div>

              {/* Uploaded Images */}
              {productData.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Đã upload {productData.images.length} ảnh
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {productData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Product ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                        <button 
                          onClick={() => {
                            const newImages = productData.images.filter((_, i) => i !== idx);
                            setProductData({ ...productData, images: newImages });
                            if (newImages.length === 0) {
                              setAiAssessment(null);
                            }
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Analysis */}
              {isAnalyzing && (
                <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    <p className="text-sm text-purple-900">AI đang phân tích ảnh...</p>
                  </div>
                </div>
              )}

              {aiAssessment && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-green-900 mb-3">✓ Phân tích AI hoàn tất</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700">Chất lượng ảnh:</span>
                      <span className="font-semibold text-green-900 ml-2">{aiAssessment.image_quality_score}/100</span>
                    </div>
                    <div>
                      <span className="text-green-700">Danh mục phát hiện:</span>
                      <span className="font-semibold text-green-900 ml-2">{aiAssessment.detected_category}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Thương hiệu:</span>
                      <span className="font-semibold text-green-900 ml-2">{aiAssessment.detected_brand}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Trust Score ước tính:</span>
                      <span className="font-semibold text-green-900 ml-2">{aiAssessment.trust_score_estimate}/100</span>
                    </div>
                  </div>
                  {aiAssessment.defects.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-orange-700 font-medium">Phát hiện khuyết điểm:</p>
                      {aiAssessment.defects.map((defect, idx) => (
                        <p key={idx} className="text-sm text-orange-600">
                          • {defect.type} tại {defect.location} (Mức độ: {defect.severity})
                        </p>
                      ))}
                    </div>
                  )}
                  {aiAssessment.suggestions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-blue-700 font-medium">Gợi ý:</p>
                      {aiAssessment.suggestions.map((suggestion, idx) => (
                        <p key={idx} className="text-sm text-blue-600">• {suggestion}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Receipt Upload (Optional) */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upload biên lai (Tùy chọn)
                <span className="text-sm font-normal text-gray-600 ml-2">Tăng Trust Score</span>
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  id="receipt-upload"
                />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-600">Upload biên lai mua hàng gốc</p>
                </label>
              </div>

              {receiptOCR && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-3">✓ OCR hoàn tất</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-blue-700">Cửa hàng:</span>
                      <span className="font-semibold text-blue-900 ml-2">{receiptOCR.store_name}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Ngày mua:</span>
                      <span className="font-semibold text-blue-900 ml-2">{receiptOCR.purchase_date}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Sản phẩm:</span>
                      <span className="font-semibold text-blue-900 ml-2">{receiptOCR.product_name}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Giá:</span>
                      <span className="font-semibold text-blue-900 ml-2">{formatCurrency(receiptOCR.price)}</span>
                    </div>
                  </div>
                  {receiptOCR.matched && (
                    <p className="text-sm text-green-600 mt-2">✓ Thông tin khớp với sản phẩm</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Quay lại
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={productData.images.length < category.min_images}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Tiếp tục {productData.images.length < category.min_images && `(Cần thêm ${category.min_images - productData.images.length} ảnh)`}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Product Info */}
        {step === 3 && category && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin sản phẩm</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={productData.title}
                  onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                  placeholder={aiAssessment ? `${aiAssessment.detected_brand} ${aiAssessment.detected_model}` : 'VD: iPhone 13 Pro 128GB Xanh Sierra'}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  placeholder="Mô tả chi tiết tình trạng sản phẩm, phụ kiện kèm theo..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá bán <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    placeholder="15000000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-16 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-3 text-gray-500">VND</span>
                </div>
              </div>

              {/* Dynamic Attributes */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(category.checklist_template).map(([key, field]: [string, any]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {key.replace(/_/g, ' ')} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select 
                          value={productData.attributes[key] || ''}
                          onChange={(e) => setProductData({ 
                            ...productData, 
                            attributes: { ...productData.attributes, [key]: e.target.value }
                          })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Chọn...</option>
                          {field.options.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={productData.attributes[key] || ''}
                          onChange={(e) => setProductData({ 
                            ...productData, 
                            attributes: { ...productData.attributes, [key]: e.target.value }
                          })}
                          min={field.min}
                          max={field.max}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deposit Option */}
              <div className="border-t pt-6">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={productData.requiresDeposit}
                    onChange={(e) => setProductData({ ...productData, requiresDeposit: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Yêu cầu đặt cọc trước khi gặp mặt
                  </span>
                </label>
                {productData.requiresDeposit && (
                  <div className="mt-3 ml-8">
                    <label className="block text-sm text-gray-700 mb-2">Tỷ lệ cọc (%)</label>
                    <input
                      type="number"
                      min="10"
                      max="30"
                      value={productData.depositPercentage}
                      onChange={(e) => setProductData({ ...productData, depositPercentage: Number(e.target.value) })}
                      className="w-32 border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <span className="text-sm text-gray-500 ml-2">
                      (10-30%, tương đương {formatCurrency((Number(productData.price) || 0) * productData.depositPercentage / 100)})
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Quay lại
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!productData.title || !productData.description || !productData.price}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Xem trước
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Preview & Publish */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Xác nhận và đăng bán</h2>
              
              {/* Trust Score Summary */}
              <div className={`rounded-lg p-6 mb-6 ${
                trustScore >= 80 ? 'bg-green-50 border border-green-200' :
                trustScore >= 60 ? 'bg-yellow-50 border border-yellow-200' :
                'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Trust Score</h3>
                    <p className="text-sm text-gray-600">Điểm tin cậy của sản phẩm</p>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">{trustScore}</div>
                </div>
                
                {trustScore >= 60 ? (
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-green-600 font-medium">✓ Đăng bán miễn phí</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Trust Score {'>='} 60, bạn không phải trả phí đăng bán
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-red-600 font-medium">⚠️ Phí đăng bán: {formatCurrency(listingFee)}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Trust Score {'<'} 60, phí đăng bán 2% = {formatCurrency(listingFee)}
                    </p>
                    <p className="text-sm text-blue-600 mt-2">
                      💡 Tip: Upload thêm ảnh chất lượng cao và biên lai để tăng Trust Score
                    </p>
                  </div>
                )}
              </div>

              {/* Product Preview */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Xem trước sản phẩm</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4">
                      {productData.images[0] && (
                        <img src={productData.images[0]} alt="Product" className="w-full h-full object-cover rounded-lg" />
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {productData.images.slice(1, 5).map((img, idx) => (
                        <img key={idx} src={img} alt={`Thumb ${idx}`} className="w-full aspect-square object-cover rounded" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{productData.title || 'Tiêu đề sản phẩm'}</h4>
                    <p className="text-2xl font-bold text-purple-600 mb-4">
                      {productData.price ? formatCurrency(Number(productData.price)) : '0 VND'}
                    </p>
                    <p className="text-gray-700 mb-4">{productData.description || 'Mô tả sản phẩm...'}</p>
                    {productData.requiresDeposit && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-yellow-800">
                          💰 Yêu cầu đặt cọc {productData.depositPercentage}% trước khi gặp mặt
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Quay lại chỉnh sửa
              </button>
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn lưu nháp? Bạn có thể tiếp tục chỉnh sửa sau.')) {
                    alert('Lưu nháp thành công!');
                    window.location.href = '/sell';
                  }
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Lưu nháp
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
              >
                Đăng bán ngay
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
