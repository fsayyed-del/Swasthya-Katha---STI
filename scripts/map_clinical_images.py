import os
import shutil

dir_path = r"d:\OneDrive - INDIA HIV AIDS ALLIANCE\Desktop\STI Magazine\public\images\clinical"

mapping = {
    # Primary Syphilis
    "extracted_p01_2.webp": "primary-syphilis-male.webp",
    "extracted_p02_2.webp": "primary-syphilis-female.webp",
    
    # Secondary Syphilis
    "extracted_p03_2.webp": "secondary-syphilis-trunk.webp",
    "extracted_p04_1.webp": "secondary-syphilis-palms.webp",
    "extracted_p04_3.webp": "secondary-syphilis-soles.webp",
    "extracted_p05_1.webp": "secondary-syphilis-mucous-patches.webp",
    "extracted_p05_3.webp": "secondary-syphilis-condyloma-lata.webp",
    
    # Gonorrhea
    "extracted_p06_2.webp": "gonorrhea-male-urethritis.webp",
    "extracted_p07_1.webp": "gonorrhea-female-urethritis.webp",
    "extracted_p07_3.webp": "gonorrhea-cervicitis.webp",
    "extracted_p08_1.webp": "gonorrhea-conjunctivitis.webp",
    "extracted_p08_3.webp": "gonorrhea-disseminated-skin.webp",
    "extracted_p09_2.webp": "gonorrhea-bartholins-abscess.webp",
    
    # Chlamydia
    "extracted_p10_1.webp": "chlamydia-male-urethritis.webp",
    "extracted_p10_3.webp": "chlamydia-cervicitis.webp",
    
    # LGV
    "extracted_p12_1.webp": "lgv-inguinal-bubo.webp",
    
    # Genital Herpes
    "extracted_p13_1.webp": "herpes-primary-female.webp",
    "extracted_p13_3.webp": "herpes-primary-male.webp",
    "extracted_p14_2.webp": "herpes-recurrent-female.webp",
    "extracted_p15_1.webp": "herpes-cervix.webp",
    
    # Chancroid
    "extracted_p16_1.webp": "chancroid-lesions.webp",
    "extracted_p16_3.webp": "chancroid-bubo.webp",
    
    # Pediculosis Pubis
    "extracted_p17_2.webp": "pediculosis-pubic-hair.webp",
    "extracted_p18_1.webp": "pediculosis-eyelashes.webp",
    
    # Genital Warts
    "extracted_p19_1.webp": "warts-female-fourchette.webp",
    "extracted_p19_3.webp": "warts-male-glans.webp",
    "extracted_p20_1.webp": "warts-giant-female.webp",
    "extracted_p20_3.webp": "warts-giant-male.webp",
}

for src_name, dst_name in mapping.items():
    src_file = os.path.join(dir_path, src_name)
    dst_file = os.path.join(dir_path, dst_name)
    if os.path.exists(src_file):
        shutil.copy2(src_file, dst_file)
        print(f"Copied: {src_name} -> {dst_name}")
    else:
        print(f"MISSING: {src_file}")

print("Canonical naming mapped successfully!")
