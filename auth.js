document.addEventListener("DOMContentLoaded", () => {
  // Form submission handling
  const authForm = document.querySelector(".auth-form")

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(authForm)
      const formValues = Object.fromEntries(formData.entries())

      // Simple validation
      let isValid = true
      const email = formValues.email
      const password = formValues.password

      if (!email || !validateEmail(email)) {
        showError("Please enter a valid email address")
        isValid = false
      }

      if (!password || password.length < 8) {
        showError("Password must be at least 8 characters long")
        isValid = false
      }

      if (isValid) {
        // Simulate authentication
        showLoading()

        setTimeout(() => {
          // Redirect to dashboard after "authentication"
          window.location.href = "dashboard.html"
        }, 1500)
      }
    })
  }

  // Email validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Show error message
  function showError(message) {
    const errorElement = document.querySelector(".auth-error")

    if (!errorElement) {
      const errorDiv = document.createElement("div")
      errorDiv.className = "auth-error"
      errorDiv.textContent = message

      const submitButton = authForm.querySelector("button[type='submit']")
      authForm.insertBefore(errorDiv, submitButton)
    } else {
      errorElement.textContent = message
    }
  }

  // Show loading state
  function showLoading() {
    const submitButton = authForm.querySelector("button[type='submit']")
    const originalText = submitButton.textContent

    submitButton.disabled = true
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...'

    // Store original text for later restoration
    submitButton.dataset.originalText = originalText
  }
})
