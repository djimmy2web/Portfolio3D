import { create } from 'zustand';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactState {
  formData: ContactFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  updateFormData: (data: Partial<ContactFormData>) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

export const useContactStore = create<ContactState>((set, get) => ({
  formData: {
    name: '',
    email: '',
    message: '',
  },
  isSubmitting: false,
  isSubmitted: false,
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  submitForm: async () => {
    set({ isSubmitting: true });
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(get().formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de l\'envoi du message');
      }

      set({ isSubmitting: false, isSubmitted: true });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        get().resetForm();
      }, 5000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      set({ isSubmitting: false });
      // Ici vous pourriez ajouter un état d'erreur si nécessaire
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    }
  },
  resetForm: () =>
    set({
      formData: { name: '', email: '', message: '' },
      isSubmitted: false,
    }),
}));
