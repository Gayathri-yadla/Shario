import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import FoodCard from '../components/FoodCard';
import AuthModal from '../components/AuthModal';
import { AuthContext } from '../context/AuthContext';
import { Loader2, Map as MapIcon, List, Crosshair, Navigation } from 'lucide-react';

// Fix Leaflet marker icons issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const FindFood = () => {
    const { user } = useContext(AuthContext);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationStats, setLocationStats] = useState({ state: 'pending', lng: null, lat: null }); // 'pending', 'granted', 'denied'
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    // For requesting a donation
    const [requesting, setRequesting] = useState(null); // id of donation being requested
    const [reqMessage, setReqMessage] = useState('');
    const [showReqModal, setShowReqModal] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            setLocationStats(prev => ({ ...prev, state: 'pending' }));
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { longitude, latitude } = position.coords;
                    setLocationStats({ state: 'granted', lng: longitude, lat: latitude });
                    fetchDonations(longitude, latitude);
                },
                (error) => {
                    console.error("Geolocation omitted/denied:", error);
                    setLocationStats({ state: 'denied', lng: null, lat: null });
                    fetchDonations(); // Fallback to get all without distance sorting
                }
            );
        } else {
            console.warn("Geolocation not supported");
            setLocationStats({ state: 'denied', lng: null, lat: null });
            fetchDonations();
        }
    };

    const fetchDonations = async (lng = null, lat = null) => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            let url = `${API_URL}/donations`;
            if (lng && lat) {
                // Fetch nearby
                url = `${API_URL}/donations/nearby?lng=${lng}&lat=${lat}`;
            }
            const res = await axios.get(url);
            setDonations(res.data);
        } catch (error) {
            console.error('Error fetching donations', error);
        } finally {
            setLoading(false);
        }
    };

    const openRequestModal = (donation) => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        setSelectedDonation(donation);
        setShowReqModal(true);
    };

    const submitRequest = async () => {
        if (!selectedDonation) return;
        setRequesting(selectedDonation._id);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.post(`${API_URL}/requests`, {
                donationId: selectedDonation._id,
                message: reqMessage
            });
            // Remove the requested donation from the local state list to show immediate feedback
            setDonations(donations.filter(d => d._id !== selectedDonation._id));
            setShowReqModal(false);
            setReqMessage('');
            alert('Food requested successfully! The donor will be notified.');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error making request');
        } finally {
            setRequesting(null);
        }
    };

    // Default map center (e.g., somewhere generic if no location, maybe USA center or specific city)
    const mapCenter = locationStats.granted && locationStats.lat ? [locationStats.lat, locationStats.lng] : [20, 0];
    const mapZoom = locationStats.granted ? 12 : 2;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in relative z-10 flex flex-col h-full min-h-[calc(100vh-64px)]">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 mt-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">Available Food</h1>
                    <p className="text-slate-400 text-lg flex items-center gap-2">
                        {locationStats.state === 'granted' ? (
                            <span className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/20">
                                <Crosshair size={16} /> Smart sorted by nearest distance
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/20">
                                <Navigation size={16} /> Showing all donations worldwide
                            </span>
                        )}
                    </p>
                </div>

                <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/50 backdrop-blur-sm self-stretch md:self-auto">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                    >
                        <List size={18} /> List Feed
                    </button>
                    <button 
                        onClick={() => setViewMode('map')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${viewMode === 'map' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                    >
                        <MapIcon size={18} /> Map View
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex-1 flex flex-col justify-center items-center py-20 min-h-[400px]">
                    <Loader2 size={48} className="text-emerald-500 animate-spin mb-4" />
                    <p className="text-slate-400 font-medium tracking-wide animate-pulse">Scanning available meals nearby...</p>
                </div>
            ) : donations.length === 0 ? (
                <div className="flex-1 flex justify-center items-center py-20 min-h-[400px]">
                    <div className="glass-panel text-center p-12 rounded-3xl border border-slate-700/50 max-w-lg shadow-2xl">
                        <div className="bg-slate-800/80 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapIcon size={32} className="text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No Food Found</h3>
                        <p className="text-slate-400 leading-relaxed">There are currently no active food donations near you. Check back later or be the first to start sharing!</p>
                    </div>
                </div>
            ) : (
                <>
                    {viewMode === 'list' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                            {donations.map((donation) => (
                                <FoodCard key={donation._id} donation={donation} onRequest={openRequestModal} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-emerald-500/10 mb-10 z-0">
                            <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full z-0">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    className="map-tiles-dark"
                                />
                                {/* Quick dark mode filter for OSM tiles using CSS in index.css */}
                                
                                {donations.map((d) => (
                                    <Marker 
                                        key={d._id} 
                                        position={[d.location.coordinates[1], d.location.coordinates[0]]}
                                    >
                                        <Popup className="custom-popup">
                                            <div className="p-1 min-w-[200px]">
                                                <h3 className="font-bold text-emerald-900 text-base mb-1">{d.title}</h3>
                                                <p className="text-sm text-slate-700 mb-3">{d.quantity}</p>
                                                <button onClick={() => openRequestModal(d)} className="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-1.5 rounded-md text-sm font-semibold transition-colors">
                                                    Request This
                                                </button>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    )}
                </>
            )}

            {showReqModal && selectedDonation && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col">
                        <div className="h-32 bg-emerald-500/20 relative">
                            {selectedDonation.image ? (
                                <img src={`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${selectedDonation.image}`} className="w-full h-full object-cover mix-blend-overlay" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <MapIcon size={64} className="text-emerald-500" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10">{selectedDonation.title}</h3>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-slate-300 mb-6 text-sm">Send a request to <strong>{selectedDonation.donor?.name || selectedDonation.donorInfo?.name}</strong> to pick up this item.</p>
                            
                            <textarea 
                                value={reqMessage}
                                onChange={(e) => setReqMessage(e.target.value)}
                                placeholder="Optional message (e.g., 'I can pick it up in 10 mins')"
                                className="input-field h-28 resize-none mb-6 shadow-inner"
                            />

                            <div className="flex gap-4">
                                <button onClick={() => setShowReqModal(false)} className="btn-secondary flex-1 py-3">Cancel</button>
                                <button onClick={submitRequest} disabled={requesting === selectedDonation._id} className="btn-primary flex-1 py-3 flex items-center justify-center font-bold">
                                    {requesting === selectedDonation._id ? <Loader2 size={20} className="animate-spin" /> : 'Confirm Request'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};

export default FindFood;
