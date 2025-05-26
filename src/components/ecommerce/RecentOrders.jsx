import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Eye, ChevronDown } from 'lucide-react';

const adsData = [
  { id: "#543", regions: "560076,560024, 560024, +12", views: "Rs 1,99,567" },
  { id: "#562", regions: "560024, 560076, 560024, +16", views: "Rs 1,99,567" },
  { id: "#390", regions: "560076, 560024, 560024, +12", views: "Rs 1,99,567" },
  { id: "#550", regions: "560076, 560024, 560024, +20", views: "Rs 2,99,567" },
  { id: "#607", regions: "560076, 560024, 560024, +17", views: "Rs 1,99,567" },
  { id: "#684", regions: "560076, 560024, 560024, +18", views: "Rs 1,99,567" },
  { id: "#170", regions: "560076, 560024, 560024, +16", views: "Rs 1,99,567" },
  { id: "#348", regions: "560076, 560024, 560024, +24", views: "Rs 1,99,567" },
  { id: "#440", regions: "560076, 560024, 560024, +18", views: "Rs 1,99,567" },
  { id: "#804", regions: "560076, 560024, 560024, +12", views: "Rs 1,99,567" },
];

export default function RecentOrders() {
  return (
     <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Top Performing Ads <span className="text-gray-500">(Region Wise)</span></h2>
        <div className="relative">
          <button className="border flex gap-3 border-gray-300 rounded px-5 py-1 text-sm text-gray-700">Last 7 Days <span><ChevronDown/></span></button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-[#E3E8F3] text-center">
              <th className="px-4 py-2 font-semibold text-gray-700">Ad ID</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Region</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Ad Views</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad, index) => (
              <tr key={index} className="border-t text-center">
                <td className="px-4 py-2 text-gray-800">{ad.id}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{ad.regions}</td>
                <td className="px-4 py-2 text-gray-800">{ad.views}</td>
                <td className="px-4 py-2 text-gray-800">
                  <div className="ml-8">
                  <Eye className="h-4 w-4 text-gray-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
