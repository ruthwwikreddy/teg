import os
import re
import subprocess

files_to_refactor = {
    "about.html": "About",
    "services.html": "Services",
    "universities.html": "Universities",
    "happy-students.html": "Students",
    "btec.html": None,
    "study-abroad.html": None,
    "contact.html": None
}

nav_template = """    <!-- NAVIGATION -->
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-500 py-3">
        <div class="container mx-auto px-6">
            <div class="glass rounded-[16px] px-8 py-2.5 flex justify-between items-center shadow-premium">
                <!-- Logo -->
                <div class="flex items-center space-x-2">
                    <img src="logo.png" alt="TEG Logo" class="h-10 w-auto" loading="lazy" decoding="async">
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center space-x-8" aria-label="Desktop Navigation">
                    <a href="index.html" class="text-navy-900 font-bold text-sm hover:text-orange-primary transition-colors" aria-label="Home">Home</a>
                    <a href="about.html" class="{about_class} font-bold text-sm hover:text-orange-primary transition-colors" aria-label="About" {about_aria}>About</a>
                    <a href="services.html" class="{services_class} font-bold text-sm hover:text-orange-primary transition-colors" aria-label="Services" {services_aria}>Services</a>
                    <a href="universities.html" class="{universities_class} font-bold text-sm hover:text-orange-primary transition-colors" aria-label="Universities" {universities_aria}>Universities</a>
                    <a href="happy-students.html#testimonials" class="{students_class} font-bold text-sm hover:text-orange-primary transition-colors" aria-label="Students" {students_aria}>Students</a>
                    <a href="contact.html" class="btn-brand !py-3 !px-6 !text-xs" aria-label="Free Counselling">Free Counselling</a>
                </nav>
                
                <!-- Mobile Menu Button -->
                <button class="lg:hidden p-2 rounded-full hover:bg-navy-900/10 transition-colors" id="mobile-menu-button" aria-label="Mobile Menu Button">
                    <svg class="w-6 h-6 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Mobile Menu -->
            <div class="hidden lg:hidden mt-4 glass rounded-3xl p-6" id="mobile-menu">
                <div class="flex flex-col space-y-4">
                    <a href="index.html" class="text-navy-900 font-bold" aria-label="Home">Home</a>
                    <a href="about.html" class="{about_class} font-bold" aria-label="About" {about_aria}>About</a>
                    <a href="services.html" class="{services_class} font-bold" aria-label="Services" {services_aria}>Services</a>
                    <a href="universities.html" class="{universities_class} font-bold" aria-label="Universities" {universities_aria}>Universities</a>
                    <a href="happy-students.html#testimonials" class="{students_class} font-bold" aria-label="Students" {students_aria}>Students</a>
                    <a href="contact.html" class="btn-brand !py-3 !px-6 !text-xs" aria-label="Free Counselling">Free Counselling</a>
                </div>
            </div>
        </div>
    </nav>
"""

footer_template = """    <!-- FOOTER -->
    <footer class="py-20 bg-white text-navy-900 border-t border-black/5 relative overflow-hidden">
        <div id="scroll-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <i class="fas fa-chevron-up"></i>
        </div>
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-12 mb-16">
                <div class="col-span-1 md:col-span-2">
                    <img src="logo.png" alt="TEG Logo" class="h-12 mb-8">
                    <p class="text-navy-700/60 max-w-sm leading-relaxed mb-8">
                        Premier overseas education consultancy with 15+ years of excellence. Empowering students to achieve their global academic dreams.
                    </p>
                    <div class="flex space-x-4">
                        <a href="https://www.facebook.com/theeducationgroup" class="w-10 h-10 rounded-full bg-navy-900/5 flex items-center justify-center hover:bg-orange-primary hover:text-white transition-all"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com/TEGEducation" class="w-10 h-10 rounded-full bg-navy-900/5 flex items-center justify-center hover:bg-orange-primary hover:text-white transition-all"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/company/the-education-group" class="w-10 h-10 rounded-full bg-navy-900/5 flex items-center justify-center hover:bg-orange-primary hover:text-white transition-all"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div>
                    <h5 class="text-sm font-black uppercase tracking-widest mb-8">Quick Links</h5>
                    <ul class="space-y-4">
                        <li><a href="index.html" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">Home</a></li>
                        <li><a href="about.html" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">About Us</a></li>
                        <li><a href="services.html" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">Our Services</a></li>
                        <li><a href="universities.html" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">Universities</a></li>
                        <li><a href="happy-students.html#testimonials" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">Success Stories</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-sm font-black uppercase tracking-widest mb-8">Resources</h5>
                    <ul class="space-y-4">
                        <li><a href="happy-students.html#testimonials" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">Happy Students</a></li>
                        <li><a href="btec.html" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">BTEC Programs</a></li>
                        <li><a href="study-abroad.html" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">Study Abroad</a></li>
                        <li><a href="contact.html" class="text-navy-700/60 hover:text-orange-primary transition-colors text-sm font-bold">Free Counselling</a></li>
                    </ul>
                </div>
            </div>
            <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 text-navy-700/30 text-xs font-bold uppercase tracking-[0.2em]">
                <p>&copy; 2024 The Education Group. All Rights Reserved.</p>
                <div class="flex space-x-8 mt-4 md:mt-0">
                    <a href="privacy-policy.html" class="hover:text-orange-primary transition-colors">Privacy Policy</a>
                    <a href="terms-of-service.html" class="hover:text-orange-primary transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
"""

def refactor_file_v3(file_path, active_link):
    with open(file_path, 'r') as f:
        content = f.read()

    # 1. Update <head>
    # Add style.css link after tailwind script if not already there
    tailwind_pattern = r'<script src="https://cdn.tailwindcss.com"></script>'
    style_link = '<link rel="stylesheet" href="style.css">'
    if style_link not in content:
        content = content.replace(tailwind_pattern, tailwind_pattern + '\n    ' + style_link)
    
    # Remove <style>...</style>
    content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)

    # 2. Update Navigation
    classes = {
        "about_class": "text-navy-900",
        "services_class": "text-navy-900",
        "universities_class": "text-navy-900",
        "students_class": "text-navy-900",
        "about_aria": "",
        "services_aria": "",
        "universities_aria": "",
        "students_aria": ""
    }
    if active_link == "About":
        classes["about_class"] = "text-orange-primary"
        classes["about_aria"] = 'aria-current="page"'
    elif active_link == "Services":
        classes["services_class"] = "text-orange-primary"
        classes["services_aria"] = 'aria-current="page"'
    elif active_link == "Universities":
        classes["universities_class"] = "text-orange-primary"
        classes["universities_aria"] = 'aria-current="page"'
    elif active_link == "Students":
        classes["students_class"] = "text-orange-primary"
        classes["students_aria"] = 'aria-current="page"'
    
    formatted_nav = nav_template.format(**classes)
    
    # Safely replace navigation block
    # Match from <!-- NAVIGATION --> until <!-- HERO SECTION --> (if exists) or the next comment
    nav_pattern = r'<!-- NAVIGATION -->.*?<!-- HERO SECTION -->'
    if re.search(nav_pattern, content, flags=re.DOTALL):
        content = re.sub(nav_pattern, formatted_nav + "\n    <!-- HERO SECTION -->", content, flags=re.DOTALL)
    else:
        # Fallback for pages without HERO SECTION comment (like contact.html maybe?)
        nav_pattern_alt = r'<!-- NAVIGATION -->.*?<nav id="navbar".*?</nav>'
        # To avoid the inner nav issue, we use a more greedy match or match specifically for the outer nav structure
        # In our case, matching until the next comment is safest.
        nav_pattern_safe = r'<!-- NAVIGATION -->.*?(?=<!--)'
        if re.search(nav_pattern_safe, content, flags=re.DOTALL):
            content = re.sub(nav_pattern_safe, formatted_nav, content, flags=re.DOTALL)

    # 3. Update Footer
    footer_pattern = r'<!-- FOOTER -->.*?<footer.*?</footer>'
    content = re.sub(footer_pattern, footer_template, content, flags=re.DOTALL)

    # 4. Update Scripts
    # Remove internal script block
    content = re.sub(r'<script>\s*// Performance: Initialize AOS.*?</script>', '', content, flags=re.DOTALL)
    # Ensure script.js is after aos.js
    if '<script src="script.js"></script>' not in content:
        aos_script = '<script src="https://unpkg.com/aos@next/dist/aos.js"></script>'
        content = content.replace(aos_script, aos_script + '\n    <script src="script.js"></script>')

    with open(file_path, 'w') as f:
        f.write(content)

# Revert all changes before starting
subprocess.run(["git", "checkout", "."], cwd="/Users/ruthwikreddy/teg")

for filename, active in files_to_refactor.items():
    path = os.path.join("/Users/ruthwikreddy/teg", filename)
    if os.path.exists(path):
        print(f"Refactoring {filename}...")
        refactor_file_v3(path, active)
