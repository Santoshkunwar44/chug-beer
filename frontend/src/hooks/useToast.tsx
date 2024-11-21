import toast from "react-hot-toast";

const useToast = () => {
  const showToast = (text: string, type: "success" | "error" | "warning") => {
    if (type === "success") {
      toast.success(text, {
        icon: "✅ ",
      });
    } else if (type === "error") {
      toast.error(text, {
        icon: "❌",
      });
    }
  };

  return { showToast };
};

export default useToast;
