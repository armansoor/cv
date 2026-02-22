from playwright.sync_api import sync_playwright

def verify_responsive():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop Test (1280x720)
        print("Testing Desktop View...")
        context_desktop = browser.new_context(viewport={"width": 1280, "height": 720})
        page_desktop = context_desktop.new_page()
        page_desktop.goto("http://localhost:4173")

        # Check nav is at top (standard flow) or fixed top
        nav_desktop = page_desktop.locator(".comic-nav")
        box_desktop = nav_desktop.bounding_box()
        print(f"Desktop Nav Y: {box_desktop['y']}")
        assert box_desktop['y'] == 0  # Should be at top

        page_desktop.screenshot(path="verification_desktop.png")
        print("Desktop screenshot taken.")

        # 2. Mobile Test (375x667 - iPhone SE size)
        print("Testing Mobile View...")
        context_mobile = browser.new_context(
            viewport={"width": 375, "height": 667},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1"
        )
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:4173")

        # Check nav is at bottom
        nav_mobile = page_mobile.locator(".comic-nav")
        box_mobile = nav_mobile.bounding_box()
        print(f"Mobile Nav Y: {box_mobile['y']}")
        # Nav height is approx 60px (padding + content), screen height 667.
        # It should be close to 667 - height.
        assert box_mobile['y'] > 600

        # Check Timeline is Vertical
        page_mobile.locator("button[data-target='sagas']").click()
        # Wait for animation
        page_mobile.wait_for_timeout(1000)

        entry = page_mobile.locator(".timeline-entry").first
        entry_width = entry.bounding_box()['width']
        print(f"Mobile Entry Width: {entry_width}")
        # Screen width 375. Entry width should be (100% - 40px margin-left). approx 335.
        # Allow some flexibility for padding, but it should be > 300px, not 45% (which is ~168px)
        assert entry_width > 300

        page_mobile.screenshot(path="verification_mobile.png")
        print("Mobile screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_responsive()
