import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Loader2, ArrowLeft } from 'lucide-react';

const Donate = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        quantity: '',
        expiryTime: '',
        pickupLocation: '',
        lng: '',
        lat: '',
        image: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [locationLoading, setLocationLoading] = useState(false);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-[70vh] px-4 text-center">
                <div className="glass-panel p-8 rounded-3xl max-w-md w-full border border-slate-700/50 shadow-2xl">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                        <MapPin size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-white">Access Denied</h2>
                    <p className="text-slate-400 mb-8">Please log in to donate and share surplus food.</p>
                    <Link to="/" className="btn-primary block py-3">Return to Welcome Page</Link>
                </div>
            </div>
        );
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleGetLocation = () => {
        setLocationLoading(true);
        setError('');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData({
                        ...formData,
                        lng: position.coords.longitude,
                        lat: position.coords.latitude
                    });
                    setLocationLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setError("Could not get your location. Please ensure you have given location permissions.");
                    setLocationLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            setLocationLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.lng || !formData.lat) {
            setError("Please pinpoint your location so receivers can find the donation.");
            return;
        }

        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.post(`${API_URL}/donations`, formData);
            navigate('/find-food');
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Error creating donation. Make sure your local Backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 animate-fade-in relative z-10">
            <div className="mb-8">
                <Link to="/" className="text-slate-400 hover:text-emerald-400 flex items-center gap-2 w-fit mb-4 transition-colors font-medium">
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Donate Food</h1>
                <p className="text-slate-400 text-lg">Your contribution helps reduce food waste and feeds those in need.</p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                    <div className="bg-red-500/20 p-1.5 rounded-lg"><MapPin size={18} className="text-red-400"/></div>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-10 rounded-3xl space-y-8 border border-slate-700/50 shadow-2xl">
                <div className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                        <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                            <span className="font-bold text-lg">1</span>
                        </div>
                        <h2 className="text-xl font-semibold text-white">Food Details</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="input-field shadow-inner shadow-black/20" placeholder="e.g. 10 Boxes of Pizza" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Quantity / Portions</label>
                            <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange} className="input-field shadow-inner shadow-black/20" placeholder="e.g. 5 meals, 2 kg" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                        <textarea name="description" required value={formData.description} onChange={handleChange} className="input-field h-28 resize-none shadow-inner shadow-black/20" placeholder="Describe the food (ingredients, current condition, cooking requirements)"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Expiry or Best Before Time</label>
                        <input type="datetime-local" name="expiryTime" required value={formData.expiryTime} onChange={handleChange} className="input-field shadow-inner shadow-black/20 cursor-pointer" />
                    </div>
                </div>

                <div className="space-y-5 pt-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                        <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400">
                            <span className="font-bold text-lg">2</span>
                        </div>
                        <h2 className="text-xl font-semibold text-white">Location & Pickup</h2>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Pickup Address Details</label>
                        <input type="text" name="pickupLocation" required value={formData.pickupLocation} onChange={handleChange} className="input-field shadow-inner shadow-black/20" placeholder="Complete address, landmark, or instructions" />
                    </div>

                    <div className="p-5 bg-slate-800/40 rounded-2xl border border-slate-700/60 shadow-inner">
                        <label className="block text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                            <MapPin size={18} /> Pinpoint Location (Required)
                        </label>
                        <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                            We use your exact geographical coordinates so receivers nearby can easily find this donation on the map.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button 
                                type="button" 
                                onClick={handleGetLocation} 
                                className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-lg w-full sm:w-auto flex justify-center items-center gap-2 group"
                                disabled={locationLoading}
                            >
                                {locationLoading ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} className="group-hover:text-emerald-400 transition-colors" />}
                                {formData.lat ? 'Update Coordinates' : 'Get Current Location'}
                            </button>
                            {formData.lat && formData.lng && (
                                <div className="text-sm text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl font-mono border border-emerald-500/20 flex-1 text-center sm:text-left">
                                    <span className="text-emerald-500/50 mr-2">LAT:</span>{Number(formData.lat).toFixed(5)} <br className="sm:hidden"/>
                                    <span className="text-emerald-500/50 mx-2 hidden sm:inline">|</span>
                                    <span className="text-emerald-500/50 mr-2">LNG:</span>{Number(formData.lng).toFixed(5)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <button type="submit" disabled={loading} className="btn-primary py-4 text-xl h-16 flex items-center justify-center font-bold tracking-wide">
                        {loading ? <Loader2 size={28} className="animate-spin" /> : 'Publish Donation'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Donate;
