import { UserState } from "../redux/userSlice";

interface TypeProps {
  onClose: () => void;
  user: UserState;
}

const EditUserDetails: React.FC<TypeProps> = ({ onClose, user }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      EditUserDetails
    </div>
  );
};

export default EditUserDetails;
