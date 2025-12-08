import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRestaurantByIdQuery } from "../../state/restaurants/restuarantApiSlice";
import { Globe, Mail, Phone } from "lucide-react";

const RestaurantDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const { data: apiRestaurant, isLoading, isError } = useGetRestaurantByIdQuery(id);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load restaurant.</p>;

  // Use API data if available, otherwise use dummy data
  const restaurant = apiRestaurant || {
    id: 1,
    name: "La Pinoz Pizza",
    email: "lapinoz@example.com",
    phone: "9800000000",
    cuisine: "Italian",
    type: "Veg & Non-Veg",
    location: "Kathmandu",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=120&fit=crop&crop=center",
    description: "La Pinoz is known for its authentic Italian pizzas, fresh ingredients, and cozy ambiance. A perfect spot for pizza lovers!",
    website: "www.lapinozpizza.com",
    rating: 4.5,
    reviews: 234,
    businessHours: {
      weekdays: "10:00 AM - 10:00 PM",
      weekends: "11:00 AM - 11:00 PM"
    },
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
    ],
    owner: {
      name: "Rajesh Sharma",
      email: "rajesh.sharma@gmail.com",
      phone: "+977-9841234567",
      address: "Thamel, Kathmandu, Nepal",
      experience: "15+ years in restaurant business",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    documents: [
      { name: "Business License", type: "license", status: "verified" },
      { name: "Food Safety Certificate", type: "safety", status: "verified" },
      { name: "Tax Registration", type: "tax", status: "pending" }
    ],
    timeline: [
      { event: "Application Submitted", date: "Dec 15, 2024 - 2:30 PM", status: "completed" },
      { event: "Documents Uploaded", date: "Dec 15, 2024 - 3:15 PM", status: "completed" },
      { event: "Under Review", date: "Dec 16, 2024 - 9:00 AM", status: "current" }
    ],
    status: "pending"
  };

  const handleApprove = () => {
    setConfirmAction({
      title: "Approve Restaurant",
      message: "Are you sure you want to approve this restaurant application? This action will activate their account.",
      action: () => {
        alert("Restaurant approved successfully! The owner will be notified via email.");
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  const handleReject = () => {
    setConfirmAction({
      title: "Reject Restaurant",
      message: "Are you sure you want to reject this restaurant application? Please provide feedback to the owner.",
      action: () => {
        alert("Restaurant application rejected. Please send feedback to the owner.");
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  const viewDocument = (docType) => {
    alert(`Opening ${docType} document...`);
  };
    console.log(restaurant, "restaurnat.......")

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className=" px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Applications
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-800">Restaurant Verification</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              ✓ Approve
            </button>
            <button 
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              ✕ Reject
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            🕒 Pending Verification
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Restaurant Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src={restaurant.logo} 
                  alt={`${restaurant.name} logo`} 
                  className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {restaurant.cuisine}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {restaurant.type}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Fast Food
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      📍 <span>{restaurant.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      ⭐ <span>{restaurant.rating} ({restaurant.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                       <div className="flex items-center justify-between gap-2"> <Mail size={14}/> {restaurant.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center justify-between gap-2"> <Phone size={14}/> {restaurant.phone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-between gap-2"> <Globe size={14}/> {restaurant.website}</div>

                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Business Hours</h3>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>{restaurant.businessHours?.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span>{restaurant.businessHours?.weekends}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Description</h3>
              <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
            </div>

            {/* Restaurant Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.images?.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Restaurant view ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>
          
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Owner Information</h3>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={restaurant.owner?.photo} 
                  alt="Owner Photo" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{restaurant.owner?.name}</h4>
                  <p className="text-gray-600 text-sm">Restaurant Owner</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-600">{restaurant.owner?.email}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">{restaurant.owner?.phone}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">{restaurant.owner?.address}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Experience:</span>
                  <p className="text-gray-600">{restaurant.owner?.experience}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Documents</h3>
              <div className="space-y-3">
                {restaurant.documents?.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      📄 <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                    <button 
                      onClick={() => viewDocument(doc.name)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Timeline</h3>
              <div className="space-y-4">
                {restaurant.timeline?.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      item.status === 'completed' ? 'bg-green-500' : 
                      item.status === 'current' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.event}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-full p-4">
              <img 
                src={selectedImage} 
                alt="Full size view" 
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && confirmAction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{confirmAction.title}</h3>
              <p className="text-gray-600 mb-6">{confirmAction.message}</p>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmAction.action}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;