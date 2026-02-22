from playwright.sync_api import sync_playwright
import time

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to site...")
        try:
            page.goto("http://localhost:4173")
        except Exception as e:
            print(f"Error navigating: {e}")
            return

        print(f"Title: {page.title()}")
        assert "Abdur Rahman Mansoor" in page.title()

        # Check if Hero section is active initially
        hero_section = page.locator("#hero")
        hero_class = hero_section.get_attribute("class")
        print(f"Hero class: {hero_class}")
        assert "active" in hero_class

        # Take a screenshot of Hero
        page.screenshot(path="verification_hero.png")
        print("Hero screenshot taken.")

        # Navigate to Arsenal (Skills)
        print("Clicking Arsenal button...")
        arsenal_btn = page.locator("button[data-target='arsenal']")
        arsenal_btn.click()

        # Wait for animation (and transition)
        time.sleep(1)

        # Check if Arsenal section is active
        arsenal_section = page.locator("#arsenal")
        arsenal_class = arsenal_section.get_attribute("class")
        print(f"Arsenal class: {arsenal_class}")
        assert "active" in arsenal_class

        # Check if bars have width
        # The first bar is HTML, data-width="95%"
        html_bar = arsenal_section.locator(".bar").first
        style_attr = html_bar.get_attribute("style")
        print(f"First bar style: {style_attr}")

        # Take a screenshot of Arsenal
        page.screenshot(path="verification_arsenal.png")
        print("Arsenal screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_site()
