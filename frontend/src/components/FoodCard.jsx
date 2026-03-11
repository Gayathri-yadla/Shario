import { Clock, MapPin, PackageOpen, User as UserIcon } from 'lucide-react';


const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
};

const getDistanceMsg = (distObj) => {
    if (!distObj || distObj.calculated === undefined) return null;
    let distance = distObj.calculated;
    if (distance < 1000) return `${Math.round(distance)} m away`;
    return `${(distance / 1000).toFixed(1)} km away`;
};

const FoodCard = ({ donation, onRequest }) => {
    const isExpired = new Date(donation.expiryTime) < new Date();

    return (
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col h-full group">
            {/* Image Placeholder or Actual Image */}
            <div className="h-48 bg-slate-800 relative w-full overflow-hidden">
                {donation.image ? (
                   <img src={`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${donation.image}`} alt={donation.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                   <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-600 group-hover:scale-105 transition-transform duration-500">
                       <PackageOpen size={64} opacity={0.2} />
                   </div>
                )}
                
                {/* Distance Badge */}
                {donation.dist && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm shadow-emerald-500/30 border border-emerald-400">
                        {getDistanceMsg(donation.dist)}
                    </div>
                )}
                
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white border border-white/10 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <UserIcon size={12} className="text-emerald-400" /> 
                    {donation.donor?.name || donation.donorInfo?.name || 'Anonymous Donor'}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white leading-tight capitalize">{donation.title}</h3>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {donation.description}
                </p>

                <div className="space-y-2 mt-auto text-sm">
                    <div className="flex items-center text-slate-300 gap-2">
                        <PackageOpen size={16} className="text-cyan-400" />
                        <span className="font-medium">Quantity:</span> {donation.quantity}
                    </div>
                    
                    <div className="flex items-center text-slate-300 gap-2">
                        <Clock size={16} className={isExpired ? "text-red-400" : "text-amber-400"} />
                        <span className="font-medium">Expires:</span> 
                        <span className={isExpired ? "text-red-400" : ""}>{formatTime(donation.expiryTime)}</span>
                    </div>

                    <div className="flex items-start text-slate-300 gap-2">
                        <MapPin size={16} className="text-purple-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{donation.pickupLocation}</span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <button 
                        onClick={() => onRequest(donation)}
                        disabled={isExpired}
                        className={`w-full py-2.5 rounded-xl font-semibold transition-all shadow-md ${
                            isExpired 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                            : 'bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-400 border border-emerald-500/20'
                        }`}
                    >
                        {isExpired ? 'Donation Expired' : 'Request Food'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
