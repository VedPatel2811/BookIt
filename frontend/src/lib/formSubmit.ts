export const sendFormSubmitEmail = async (
  recipientEmail: string,
  data: Record<string, any>
): Promise<boolean> => {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("FormSubmit Error:", error);
    return false;
  }
};
