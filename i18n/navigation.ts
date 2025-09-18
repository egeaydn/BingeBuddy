import { routing } from "./routing";
import {createNavigation} from "next-intl/navigation";

//Next.js’in kendi Link, useRouter, redirect gibi fonksiyonlarını locale-aware hale getiriyor.

export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);