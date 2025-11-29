export function FeatureItem({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-start p-6 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100">
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4 border border-gray-100">
                {icon}
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}