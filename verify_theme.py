from playwright.sync_api import sync_playwright
import time

def verify_theme_and_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate a desktop viewport
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        print("Navigating to site...")
        try:
            page.goto("http://localhost:4173")
        except Exception as e:
            print(f"Error navigating: {e}")
            return

        # 1. Verify Dark Mode (Default)
        print("Checking default theme...")
        body = page.locator("body")
        theme_attr = body.get_attribute("data-theme")
        print(f"Initial data-theme: {theme_attr}")
        assert theme_attr is None  # Should be null/None for dark mode

        # Screenshot Dark Mode Hero
        page.screenshot(path="verification_hero_dark.png")
        print("Dark mode Hero screenshot taken.")

        # 2. Toggle to Light Mode
        print("Clicking theme toggle...")
        toggle_btn = page.locator(".theme-toggle")
        toggle_btn.click()
        time.sleep(0.5) # Wait for transition

        theme_attr_light = body.get_attribute("data-theme")
        print(f"New data-theme: {theme_attr_light}")
        assert theme_attr_light == "light"

        # Screenshot Light Mode Hero
        page.screenshot(path="verification_hero_light.png")
        print("Light mode Hero screenshot taken.")

        # 3. Verify Sagas (Zigzag Layout) in Light Mode
        print("Navigating to Sagas...")
        sagas_btn = page.locator("button[data-target='sagas']")
        sagas_btn.click()
        time.sleep(1)

        # Check for left/right classes
        left_panel = page.locator(".timeline-entry.left").first
        right_panel = page.locator(".timeline-entry.right").first

        assert left_panel.is_visible()
        assert right_panel.is_visible()

        # Screenshot Sagas Light Mode
        page.screenshot(path="verification_sagas_light.png")
        print("Light mode Sagas screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_theme_and_layout()
