"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import type { MutationResult } from "./types";
export interface ServiceTimeInput { label: string; time: string; order: number; }
export async function createServiceTime(data: ServiceTimeInput): Promise<MutationResult> { try { await requireAdmin(); await prisma.serviceTime.create({ data }); revalidatePath("/", "layout"); revalidateSite();
    return { success: true }; } catch { return { success: false, error: "Could not save service time." }; } }
export async function updateServiceTime(id: string, data: ServiceTimeInput): Promise<MutationResult> { try { await requireAdmin(); await prisma.serviceTime.update({ where: { id }, data }); revalidatePath("/", "layout"); revalidateSite();
    return { success: true }; } catch { return { success: false, error: "Could not save service time." }; } }
export async function deleteServiceTime(id: string): Promise<MutationResult> { try { await requireAdmin(); await prisma.serviceTime.delete({ where: { id } }); revalidatePath("/", "layout"); revalidateSite();
    return { success: true }; } catch { return { success: false, error: "Could not delete service time." }; } }
