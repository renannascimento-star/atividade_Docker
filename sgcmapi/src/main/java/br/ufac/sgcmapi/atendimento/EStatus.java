package br.ufac.sgcmapi.atendimento;

public enum EStatus {
    CANCELADO,
    AGENDADO,
    CONFIRMADO,
    CHEGADA,
    ATENDIMENTO,
    ENCERRADO;

    public EStatus proximo() {
        var status = this;
        var indice = ordinal() + 1;
        if (indice > 1 && indice < values().length) {
            status = values()[indice];
        }
        return status;
    }
}
