import { motion } from "framer-motion";
import { useState } from "react";
import { FaChartBar, FaTimesCircle } from "react-icons/fa";
import OverviewTab from "./tabs/OverviewTab";
  import PopulationTab from "./tabs/PopulationTab";
import SearchTab from "./tabs/SearchTab";

const DetailedStatsModal = ({ data, onClose }) => {
  const [activeDetailTab, setActiveDetailTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaChartBar /> },
    { id: 'population', label: 'Population', icon: <FaChartBar /> },
    { id: 'search', label: 'Search', icon: <FaChartBar /> }
  ];

  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center">
          <div className="flex items-center">
            <FaChartBar className="text-white text-3xl mr-4" />
            <h2 className="text-2xl font-bold text-white">Detailed Global Statistics</h2>
          </div>
          <button 
            className="text-white/90 hover:text-white transition-colors"
            onClick={onClose}
          >
            <FaTimesCircle className="text-2xl" />
          </button>
        </div>
        
        <div className="flex border-b border-gray-200 bg-gray-50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeDetailTab === tab.id 
                  ? 'text-blue-700 border-b-2 border-blue-700 bg-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveDetailTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {activeDetailTab === 'overview' && <OverviewTab data={data} />}
          {activeDetailTab === 'population' && <PopulationTab data={data} />}
          {activeDetailTab === 'search' && <SearchTab data={data} />}
        </div>
        
        <div className="border-t border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
          Data sourced from Rest Countries API • Updated regularly
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailedStatsModal;