// src/pages/KOLDashboard.jsx
import React, { useState } from 'react';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';
import AlertBanner from '../components/AlertBanner';

const KOLDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AlertBanner
                message="Please complete your Payment and Tax information to receive commission."
                link="/payment-info"
                linkText="Payment and Tax information"
            />

            <div className="max-w-7xl mx-auto">
                {/* Header Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Chỉ Số</h1>
                            <p className="text-gray-500 mt-1">
                                So với ngày hôm trước
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                            {/* Date Input */}
                            <input
                                type="date"
                                className="border border-gray-300 rounded px-3 py-2"
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />

                            {/* Action Buttons */}
                            <button
                                onClick={handleRefresh}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                disabled={isLoading}
                            >
                                <FiRefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-500 text-sm">Clicks</h3>
                            <span className="text-xs text-gray-400">0%</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">0</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-500 text-sm">Đơn hàng</h3>
                            <span className="text-xs text-gray-400">0%</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">0</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-500 text-sm">Hoa Hồng ước tính(đ)</h3>
                            <span className="text-xs text-gray-400">0%</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">0</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-500 text-sm">Số Lượng Đã Bán</h3>
                            <span className="text-xs text-gray-400">0%</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">0</p>
                    </div>
                </div>

                {/* Click Analysis */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Phân tích lượt click</h2>
                    <div className="flex items-center">
                        <div className="mr-3 p-2 bg-gray-100 rounded-full">
                            <FiRefreshCw className="text-gray-600" />
                        </div>
                        <div>
                            <p className="text-gray-600">Mạng xã hội</p>
                            <p className="text-gray-800 font-semibold">0</p>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Top 5 sản phẩm của tôi</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản Phẩm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Lượng Đã Bán</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hoa Hồng ước tính(đ)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4" colSpan="4">
                                        <div className="text-center text-gray-500">Không có dữ liệu</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KOLDashboard;