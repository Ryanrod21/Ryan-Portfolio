import { useEffect } from "react";

const HubspotForm = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js-na2.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "242339982",
          formId: "d6fa9fef-d25a-4056-b3aa-a70f56041e76",
          region: "na2",
          target: "#hubspotForm",
          css: "",
          cssRequired: "",
          onFormReady: ($form) => {
            $form.style.background = "white";
            $form.style.padding = "20px";
            $form.style.width = "unset";
            $form.style.borderRadius = "10px";

            const hubspotBranding = $form.querySelector(
              ".hs-form__virality-link"
            );
            const submitMessage = $form.querySelector(".submitted-message");
            const inputFields = $form.querySelectorAll("input");
            const submitButton = $form.querySelector("input[type='submit']");
            const selectFields = $form.querySelectorAll("select");
            const textareaFields = $form.querySelectorAll("textarea");
            const actions = $form.querySelector(".actions");

            if (hubspotBranding) {
              hubspotBranding.style.opacity = "0";
            }

            if (submitMessage) {
              submitMessage.style.textAlign = "center";
              submitMessage.style.fontWeight = "700";
              submitMessage.style.fontStyle = "italic";
            }

            if (inputFields) {
              inputFields.forEach((field) => {
                field.style.width = "100%";
                field.style.maxWidth = "100%";
              });
            }

            if (selectFields) {
              selectFields.forEach((field) => {
                field.style.width = "100%";
                field.style.maxWidth = "100%";
              });
            }

            if (textareaFields) {
              textareaFields.forEach((field) => {
                field.style.width = "100%";
                field.style.maxWidth = "100%";
              });
            }

            if (submitButton) {
              submitButton.style.maxWidth = "200px";
              submitButton.style.position = "relative";
              submitButton.style.padding = "16px";
              submitButton.style.fontSize = "20px";
              submitButton.style.fontWeight = "bold";
              submitButton.style.color = "white";
              submitButton.style.background = "black";
              submitButton.style.borderRadius = "10px";
              submitButton.style.textAlign = "center";
              submitButton.style.borderColor = "#3ec8e0";
            }

            if (actions) {
              actions.style.textAlign = "center";
            }
          },
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return <div id="hubspotForm"></div>;
};

export default HubspotForm;
