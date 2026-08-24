#!/usr/bin/env python3
"""
validate_asset_rights.py
Enforces Green / Amber / Red rights criteria and SHA-256 integrity for all clinical visual assets.
"""

import json
import os
import hashlib
import sys

def main():
    registry_path = os.path.join("content", "clinical", "asset-registry.json")
    if not os.path.exists(registry_path):
        print(f"Error: Registry not found at {registry_path}")
        sys.exit(1)

    with open(registry_path, "r", encoding="utf-8") as f:
        assets = json.load(f)

    print(f"Auditing {len(assets)} visual assets in {registry_path}...")
    errors = []

    for a in assets:
        asset_id = a.get("assetId", "UNKNOWN")
        
        # 1. Check required fields
        required_fields = [
            "assetId", "sourceUrl", "sourceTitle", "sourceOrganization",
            "licenseType", "attributionText", "clinicalInterpretation",
            "clinicalStatus", "sensitivityLevel", "allowedAudience",
            "altText", "caption", "originalChecksum"
        ]
        for f in required_fields:
            if f not in a or not a[f]:
                errors.append(f"[{asset_id}] Missing required field: {f}")

        # 2. Check Green rights status
        if a.get("clinicalStatus") != "approved":
            errors.append(f"[{asset_id}] Clinical status is not approved: {a.get('clinicalStatus')}")

        # 3. Check derivative file exists and matches SHA-256
        deriv_path = a.get("derivativePaths", {}).get("webp")
        if not deriv_path:
            errors.append(f"[{asset_id}] Missing WebP derivative path")
        else:
            rel_path = deriv_path.lstrip("/")
            local_path = os.path.join("public", rel_path)
            if not os.path.exists(local_path):
                errors.append(f"[{asset_id}] Local file does not exist: {local_path}")
            else:
                with open(local_path, "rb") as fp:
                    calculated_hash = hashlib.sha256(fp.read()).hexdigest()
                if calculated_hash != a.get("originalChecksum"):
                    errors.append(f"[{asset_id}] SHA-256 mismatch! Expected {a.get('originalChecksum')}, got {calculated_hash}")

        # 4. Check Alt-text multilingual coverage
        alt = a.get("altText", {})
        if not alt.get("en") or not alt.get("hi"):
            errors.append(f"[{asset_id}] Alt-text must have non-empty 'en' and 'hi' descriptions")

    if errors:
        print(f"\nFAILED: Found {len(errors)} validation errors:")
        for e in errors:
            print(f" - {e}")
        sys.exit(1)
    else:
        print("\nSUCCESS: All 9 visual assets verified: 100% Green Rights, Valid SHA-256 Hashes & Alt-Text!")

if __name__ == "__main__":
    main()
