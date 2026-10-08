import { Injectable, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { crearCuentaInterfaz } from '../models/crearCuentaInterfaz';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private claveUsuarios = 'usuarios';
  private claveSesion = 'usuarioSesion';
  private claveAdopciones = 'adopcionesUsuario';

  private platformId = inject(PLATFORM_ID);

  sesionActiva = signal(false);
  adopcionesActualizadas = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.sesionActiva.set(
        localStorage.getItem(this.claveSesion) !== null
      );
    }
  }

  obtenerUsuarios(): crearCuentaInterfaz[] {

    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    const usuarios = localStorage.getItem(this.claveUsuarios);

    return usuarios ? JSON.parse(usuarios) : [];
  }

  registrarUsuario(usuario: crearCuentaInterfaz): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const usuarios = this.obtenerUsuarios();

    const existe = usuarios.some(
      u => u.correo.toLowerCase() === usuario.correo.toLowerCase()
    );

    if (existe) {
      return false;
    }

    usuarios.push(usuario);

    localStorage.setItem(
      this.claveUsuarios,
      JSON.stringify(usuarios)
    );

    return true;
  }

  iniciarSesion(
    correo: string,
    contraseña: string
  ): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const usuarios = this.obtenerUsuarios();

    const usuario = usuarios.find(
      u =>
        u.correo.toLowerCase() === correo.toLowerCase() &&
        u.contraseña === contraseña
    );

    if (!usuario) {
      return false;
    }

    localStorage.setItem(
      this.claveSesion,
      JSON.stringify(usuario)
    );

    this.sesionActiva.set(true);

    return true;
  }

  estaLogueado(): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return localStorage.getItem(this.claveSesion) !== null;
  }

  obtenerSesion(): crearCuentaInterfaz | null {

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const usuario = localStorage.getItem(this.claveSesion);

    return usuario ? JSON.parse(usuario) : null;
  }

  cerrarSesion(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem(this.claveSesion);

    this.sesionActiva.set(false);

    this.adopcionesActualizadas.update(
      valor => valor + 1
    );
  }

  obtenerAdopciones(): string[] {

    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    const usuario = this.obtenerSesion();

    if (!usuario) {
      return [];
    }

    const adopciones = localStorage.getItem(
      this.claveAdopciones
    );

    if (!adopciones) {
      return [];
    }

    const todasLasAdopciones = JSON.parse(adopciones);

    return todasLasAdopciones[
      usuario.correo.toLowerCase()
    ] || [];
  }

  registrarAdopcion(animal: string): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const usuario = this.obtenerSesion();

    if (!usuario) {
      return;
    }

    const adopcionesGuardadas = localStorage.getItem(
      this.claveAdopciones
    );

    const todasLasAdopciones = adopcionesGuardadas
      ? JSON.parse(adopcionesGuardadas)
      : {};

    const correo = usuario.correo.toLowerCase();

    if (!todasLasAdopciones[correo]) {
      todasLasAdopciones[correo] = [];
    }

    if (!todasLasAdopciones[correo].includes(animal)) {
      todasLasAdopciones[correo].push(animal);
    }

    localStorage.setItem(
      this.claveAdopciones,
      JSON.stringify(todasLasAdopciones)
    );

    this.adopcionesActualizadas.update(
      valor => valor + 1
    );
  }

  yaSePostulo(animal: string): boolean {

    const adopciones = this.obtenerAdopciones();

    return adopciones.some(
      a => a.toLowerCase() === animal.toLowerCase()
    );
  }
}