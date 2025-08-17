import { Search, Filter, Grid, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { mockAssets as assets } from "../mock/mockAssets";
import Layout from "../components/Layout/Layout";
import { AssetRow } from "../components/AssetRow/AssetRow";
import AssetModal from "../components/Modals/AssetModal";
import { Asset } from "../types/asset";
import { useNavigate, useLocation } from "react-router-dom";

const Assets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Filter assets based on search and category
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || asset.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(assets.map((asset) => asset.type))];

  // Modal functions
  const openAssetModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const closeAssetModal = () => {
    setSelectedAsset(null);
    setIsModalOpen(false);
  };

  const goBack = () => {
    if (location.key === "default") {
      // "default" key implies this is the first route accessed
      navigate("/home", { replace: true }); // Fallback to a home page or another appropriate route
    } else {
      navigate(-1); // Otherwise, go back one step in history
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Assets Library</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            onClick={goBack}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              onClick={() => openAssetModal(asset)}
            >
              <AssetRow isBalanceVisible asset={asset} />
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <Grid className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No assets found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <AssetModal
          closeAssetModal={closeAssetModal}
          isModalOpen={isModalOpen}
          selectedAsset={selectedAsset}
        />
      )}
    </Layout>
  );
};

export default Assets;
