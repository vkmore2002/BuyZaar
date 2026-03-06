import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyProfile, updateMyProfile } from "../services/userService";

function Profile() {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const profileData = await getMyProfile(user.token);
        setProfile(profileData);
        setFormData({
          name: profileData.name || "",
          phone: profileData.phone || "",
          profileImage: profileData.profileImage || "",
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const updatedProfile = await updateMyProfile(formData, user.token);

      // Update the profile state
      setProfile(updatedProfile);

      // Update the auth context
      const updatedUser = {
        ...user,
        name: updatedProfile.name,
        phone: updatedProfile.phone,
        profileImage: updatedProfile.profileImage,
      };
      login(updatedUser);

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
      profileImage: profile.profileImage || "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        Failed to load profile. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-[#FBF7F3] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-[#7A2E0E] text-center mb-8">
          My Profile
        </h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#FF8A65] text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#FF8A65] text-2xl font-bold">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-orange-100">{profile.email}</p>
                <p className="text-sm text-orange-100 mt-1">
                  Member since{" "}
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#7A2E0E]">
                Personal Information
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#FF8A65] text-white px-4 py-2 rounded-lg hover:opacity-95 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:opacity-95 transition"
                    disabled={updating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-[#FF8A65] text-white px-4 py-2 rounded-lg hover:opacity-95 transition"
                    disabled={updating}
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent transition"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                    {profile.name || "Not provided"}
                  </p>
                )}
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <p className="text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                  {profile.email}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent transition"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                    {profile.phone || "Not provided"}
                  </p>
                )}
              </div>

              {/* Profile Image URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent transition"
                    placeholder="Enter image URL (optional)"
                  />
                ) : (
                  <p className="text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                    {profile.profileImage || "No image set"}
                  </p>
                )}
              </div>

              {/* Account Information */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-[#7A2E0E] mb-4">
                  Account Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg capitalize">
                      {profile.role}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Verified
                    </label>
                    <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                      {profile.isEmailVerified ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Updated
                    </label>
                    <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                      {new Date(profile.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-800">
                Security Information
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Your personal information is secure and encrypted. Password
                changes can be made through the login page if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
